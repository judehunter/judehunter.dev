import {GlobalStyles} from 'twin.macro';
import '../misc/global.css';
import {useGAPageView} from '../misc/gtag';

const App = ({Component, pageProps}) => {
  useGAPageView();
  return (
    // <OptTina>
    <div>
      <GlobalStyles />
      <Component {...pageProps} />
    </div>
    // </OptTina>
  );
};

export default App;
