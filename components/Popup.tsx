import {createContext, useState} from 'react';
import * as ReactDOM from 'react-dom';
import tw from 'twin.macro';

// export const Popup = ({children, onClose}) => {
//   const el =
//     <div tw="absolute top-0 left-0 right-0 bottom-0" onClick={onClose}>
//       {children}
//     </div>
//   return process.browser ? ReactDOM.createPortal(
//     el,
//     document.body
//   ) : null;
// }

// export const ShadowPopup = ({children, onClose}) => {
//   return (
//     <Popup onClose={onClose}>
//       <div>
//         {children}
//       </div>
//     </Popup>
//   )
// }

export const ImgPopupCtx = createContext(null);

// export const ImgPopup = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Popup onClose={onClose}>
//       <div>
//         {children}
//       </div>
//     </Popup>
//   )
// }