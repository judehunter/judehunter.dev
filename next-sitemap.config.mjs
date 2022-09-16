import {readFile} from 'fs/promises';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';

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
      const mdxData = await serialize(await readFile(path.join('content', 'posts/', p.slice(6) + '.mdx'), 'utf-8'), {
        parseFrontmatter: true,
      });
      return {
        loc: p,
        changefreq: config.changefreq,
        priority: 0.8,
        lastmod: mdxData.frontmatter.updateDate,
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
