import tw, {css} from 'twin.macro';
// import client from '../../../.tina/__generated__/client';
import {BlogPage} from '../../components/BlogPage/BlogPage';
import {serialize} from 'next-mdx-remote/serialize';
import {readdir, readFile, writeFile} from 'fs/promises';
import path, {resolve} from 'path';
import {Global} from '@emotion/react';
import {visit} from 'unist-util-visit';
import chromium from 'chrome-aws-lambda';
import Head from 'next/head';
import {useRouter} from 'next/router';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://judehunter.dev';

const BlogPageExport = ({source}) => {
  const router = useRouter();
  const {filename} = router.query;

  const ogImageUrl = `${baseUrl}/ogimages/${filename}.png`;

  return (
    <>
      <Global
        styles={css`
          @font-face {
            font-family: 'Fira Code';
            src: url('/FiraCode-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
        `}
      />
      <Head>
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta name="twitter:image:src" content={ogImageUrl} />
      </Head>
      <BlogPage {...{source}} />
    </>
  );
};

export const getStaticProps = async ({params}) => {
  const file = await readFile(path.join('content', 'posts/', `${params.filename}.mdx`), 'utf-8');

  const mdxSource = await serialize(file, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        () => (tree) => {
          visit(tree, (node) => {
            if (node.type === 'text') {
              console.log(node);
              node.value = (node.value as string).replace(/---/g, '—').replace(/--/g, '–');
            }
          });
        },
      ],
    },
  });

  let browser = null as any;

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
    await page.goto('file://' + resolve('src/misc/blogOgImage.html'), {
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
      (el, thumbnail) => (el.style.backgroundImage = `url('../../public${thumbnail}')`),
      mdxSource.frontmatter!.thumbnail,
    );
    let image2El = await page.$('#image2');
    await image2El.evaluate(
      (el, thumbnail) => (el.style.backgroundImage = `url('../../public${thumbnail}')`),
      mdxSource.frontmatter!.thumbnail,
    );
    let titleEl = await page.$('#title');
    await titleEl.evaluate((el, title) => (el.textContent = title), mdxSource.frontmatter!.title);
    // Capture the screenshot
    const buffer = await page.screenshot(screenshotParameters, {
      type: 'png',
      clip: {width: 1200, height: 630},
      encoding: 'base64',
    });
    await writeFile('public/ogimages/' + params.filename + '.png', buffer, 'base64');
  } catch (e) {
    throw e;
  } finally {
    await browser.close();
  }

  return {props: {source: mdxSource}};
};

export const getStaticPaths = async () => {
  const filesString = await readdir(path.join('content', 'posts/'));
  const paths = filesString.map((x) => '/blog/' + x.replace('.mdx', ''));
  return {
    paths: paths,
    fallback: false,
  };
};

export default BlogPageExport;
