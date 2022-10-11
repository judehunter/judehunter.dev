import Script from 'next/script';
import {GlobalStyles} from 'twin.macro';
import '../misc/global.css';

const App = ({Component, pageProps}) => {
  // useGAPageView();
  return (
    <>
      <GlobalStyles />
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-VF7DM82296`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VF7DM82296');
          `,
            }}
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
};

export default App;
