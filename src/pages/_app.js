import Script from 'next/script';
import {GlobalStyles} from 'twin.macro';
import {usePostHog} from '../misc/a7s';
import '../misc/global.css';

const App = ({Component, pageProps}) => {
  // usePostHog(
  //   process.env.NODE_ENV === 'production'
  //     ? 'phc_QqZZAEEXYVVSnwfZQxcqMMfPH5n3gCjmLi4fSZX2yqY'
  //     : 'phc_ME8up5kKmkINHUrDyBO03P812h1Os6XPMQPcleO3eeI',
  //   {
  //     api_host: 'https://app.posthog.com',
  //   },
  // );
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
