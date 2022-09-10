import Tina from '../../.tina/components/TinaDynamicProvider.js';
import {GlobalStyles} from 'twin.macro';
import '../misc/global.css';
import {useGAPageView} from '../misc/gtag';

const App = ({Component, pageProps}) => {
  useGAPageView();
  return (
    <Tina>
      <div>
        <GlobalStyles />
        <Component {...pageProps} />
      </div>
    </Tina>
  );
};

export default App;
