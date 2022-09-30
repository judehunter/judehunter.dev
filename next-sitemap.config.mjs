import {readdir, readFile} from 'fs/promises';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import { visit } from 'unist-util-visit';

const serverSerializeMDX = (text) => {
  return serialize(text, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'text') {
              node.value = (node.value).replace(/---/g, '—').replace(/--/g, '–').replace(/'/g, '’');
            }
          });
        },
      ],
    },
  });
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

      return {
        source,
        slug: fileOrDir.replace('.mdx', ''),
        url: '/blog/' + fileOrDir.replace('.mdx', ''),
      };
    }),
  );

  return posts;
};

const posts = await serverSerializeAllPosts();

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://judehunter.dev',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.5,
  transform: async (config, p) => {
    if (p === '/')
      return {
        loc: p,
        changefreq: config.changefreq,
        priority: 1,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
      };

    if (p === '/blog')
      return {
        loc: p,
        changefreq: config.changefreq,
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
      };

    if (p.startsWith('/blog/')) {
      const {source} = posts.find(x => x.url === p);
      return {
        loc: p,
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: source.frontmatter.updateDate,
        alternateRefs: config.alternateRefs ?? [],
      };
    }

    return {
      loc: p,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
