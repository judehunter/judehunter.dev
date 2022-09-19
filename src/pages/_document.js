import Doc, {Html, Head, Main, NextScript} from 'next/document';
import {extractCritical} from '@emotion/server';

export default class MyDocument extends Doc {
  static async getInitialProps(ctx) {
    const initialProps = await Doc.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return {...initialProps, ...page, ...styles};
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap"
            rel="stylesheet"
          /> */}
          <style data-emotion-css={this.props.ids.join(' ')} dangerouslySetInnerHTML={{__html: this.props.css}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
