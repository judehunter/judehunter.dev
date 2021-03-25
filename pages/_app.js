import {GlobalStyles} from 'twin.macro'
import '../utils/global.css';

const App = ({Component, pageProps}) => (
  <div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>
)

export default App