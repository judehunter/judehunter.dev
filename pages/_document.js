import Document, {Html, Head, Main, NextScript} from 'next/document';
import {extractCritical} from '@emotion/server';
import tw from 'twin.macro';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const page = await ctx.renderPage()
    const styles = extractCritical(page.html)
    return {...initialProps, ...page, ...styles}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Work+Sans:wght@400;500&family=Rubik:wght@700;800;900&family=Indie+Flower&family=IBM+Plex+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
          <link href="/apercu/stylesheet.css" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{__html: this.props.css}}
          />
        </Head>
        <body tw="font-display overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}