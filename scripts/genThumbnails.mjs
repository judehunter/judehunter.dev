import {lstat, readdir, readFile, writeFile} from 'fs/promises';
import {visit} from 'unist-util-visit';
import chromium from 'chrome-aws-lambda';
import {serialize} from 'next-mdx-remote/serialize';
import path, {resolve} from 'path';

(async () => {
  const filesString = await readdir(path.join('content', 'posts/'));

  for (const p of filesString) {
    let rel = path.join('content', 'posts/', p);
    const isDir = (await lstat(rel)).isDirectory();

    rel = isDir ? path.join(rel, '/index.mdx') : rel;
    const file = await readFile(rel, 'utf-8');

    const mdxSource = await serialize(file, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          () => (tree) => {
            visit(tree, (node) => {
              if (node.type === 'text') {
                node.value = node.value.replace(/---/g, '—').replace(/--/g, '–');
              }
            });
          },
        ],
      },
    });

    let browser = null;

    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      });

      // set viewport
      const page = await browser.newPage();
      const viewport = {width: 1200, height: 630};
      page.setViewport(viewport);

      // go to url
      await page.goto('file://' + resolve('scripts/blogOgImage.html'), {
        timeout: 30 * 1000,
        waitUntil: 'networkidle2',
      });

      // set screenshot parameters
      let screenshotParameters = {
        type: 'jpeg',
        quality: 100,
        omitBackground: true,
        clip: {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        },
      };

      let image1El = await page.$('#image1');
      await image1El.evaluate(
        (el, thumbnail) => (el.style.backgroundImage = `url('../public${thumbnail}')`),
        mdxSource.frontmatter.thumbnail,
      );
      let image2El = await page.$('#image2');
      await image2El.evaluate(
        (el, thumbnail) => (el.style.backgroundImage = `url('../public${thumbnail}')`),
        mdxSource.frontmatter.thumbnail,
      );
      let titleEl = await page.$('#title');
      await titleEl.evaluate((el, title) => (el.textContent = title), mdxSource.frontmatter.title);
      // Capture the screenshot
      const buffer = await page.screenshot(screenshotParameters, {
        type: 'png',
        clip: {width: 1200, height: 630},
        encoding: 'base64',
      });
      await writeFile('public/ogimages/' + (isDir ? p + '.png' : p.slice(0, -4) + '.png'), buffer, 'base64');
    } catch (e) {
      throw e;
    } finally {
      await browser.close();
    }
  }
})();
