import {readdir, readFile, stat} from 'fs/promises';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import {getPlaiceholder} from 'plaiceholder';
import {visit} from 'unist-util-visit';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

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
        () => (tree) => {
          visit(tree, 'root', (node) => {
            if (!~text.indexOf('GraphQL has')) return;
            // console.dir(node, {depth: null});
          });
        },
        () => (tree) => {
          visit(tree, 'code', (node, idx, parent) => {
            if (!~text.indexOf('GraphQL has')) return;
            const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'))/g;
            let match;
            let attrs = {};
            while ((match = re.exec(node.meta))) {
              attrs[match[1]] = match[2] || match[3] || '';
            }
            parent.children[idx] = {
              type: 'mdxJsxFlowElement',
              name: 'CodeBlock',
              attributes: Object.entries(attrs).map(([k, v]) => ({
                type: 'mdxJsxAttribute',
                name: k,
                value: v,
              })),
              children: [node],
            };
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

  const source = await serverSerializeMDX(file);

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

      const source = await serverSerializeMDX(file);

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
