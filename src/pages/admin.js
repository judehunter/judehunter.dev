import {TinaAdmin} from 'tinacms';
const OptTinaAdmin = process.env.NODE_ENV === 'production' ? () => <div /> : TinaAdmin;
export default OptTinaAdmin;
