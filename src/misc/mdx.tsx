import {readdir, readFile, stat} from 'fs/promises';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import {getPlaiceholder} from 'plaiceholder';
import {visit} from 'unist-util-visit';
import * as rehypePrism from '@mapbox/rehype-prism';
import {devCache} from './devCache';
import remarkGfm from 'remark-gfm';

export const devMdxCache =
  devCache<Awaited<ReturnType<typeof serverSerializeMDX>>>();

const dirExists = async (path) =>
  !!(await stat(path).catch((e) => null))?.isDirectory();

const serverSerializeMDX = (text: string) => {
  return serialize(text, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'text') {
              node.value = (node.value as string)
                .replace(/---/g, '—')
                .replace(/--/g, '–')
                .replace(/'/g, '’');
            }
          });
        },
      ],
      rehypePlugins: [rehypePrism],
    },
  });
};

export const serverSerializePostBySlug = async (slug: string) => {
  let slugPath = path.join('content', 'posts/', slug);
  const isSlugPathDir = await dirExists(slugPath);
  let filePath = isSlugPathDir
    ? path.join(slugPath, 'index.mdx')
    : slugPath + '.mdx';
  const file = await readFile(filePath, 'utf-8');

  let source = devMdxCache.get(file);

  if (!source) {
    source = await serverSerializeMDX(file);
    devMdxCache.set(file, source);
  }

  const components = isSlugPathDir
    ? Object.keys(await import(`../../content/posts/${slug}/components.tsx`))
    : null;

  return {source, components};
};

export const serverSerializeAllPosts = async () => {
  const filesOrDirs = await readdir(path.join('content', 'posts/'));

  const posts = await Promise.all(
    filesOrDirs.map(async (fileOrDir) => {
      const isDir = !fileOrDir.endsWith('.mdx');

      const filePath = isDir
        ? path.join('content', 'posts/', fileOrDir, 'index.mdx')
        : path.join('content', 'posts/', fileOrDir);

      const file = await readFile(filePath, 'utf-8');

      let source = devMdxCache.get(file);

      if (!source) {
        source = await serverSerializeMDX(file);
        devMdxCache.set(file, source);
      }

      const {base64: thumbnailBlurDataUrl} = await getPlaiceholder(
        source.frontmatter!.thumbnail,
        {size: 4},
      );

      return {
        source,
        slug: fileOrDir.replace('.mdx', ''),
        thumbnailBlurDataUrl,
        url: '/blog/' + fileOrDir.replace('.mdx', ''),
      };
    }),
  );

  return posts;
};
