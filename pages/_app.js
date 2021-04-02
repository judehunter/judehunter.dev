import {GlobalStyles} from 'twin.macro'
import '../utils/global.css';
import {useGAPageView} from '../utils/gtag';

const App = ({Component, pageProps}) => {
  useGAPageView();
  return (<div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>)
}

export default App