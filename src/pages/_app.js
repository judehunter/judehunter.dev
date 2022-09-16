import {GlobalStyles} from 'twin.macro';
import '../misc/global.css';
import {useGAPageView} from '../misc/gtag';

const App = ({Component, pageProps}) => {
  useGAPageView();
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
