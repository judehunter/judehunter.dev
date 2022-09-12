import Tina from '../../.tina/components/TinaDynamicProvider.js';
import {GlobalStyles} from 'twin.macro';
import '../misc/global.css';
import {useGAPageView} from '../misc/gtag';
import {Fragment} from 'react';

const App = ({Component, pageProps}) => {
  useGAPageView();
  const OptTina = process.env.NODE_ENV === 'production' ? Fragment : Tina;
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
