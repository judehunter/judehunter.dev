import {css} from 'twin.macro';
import Masonry from 'react-masonry-css';

export const MasonryGrid = ({children}) =>
  <div
    css={[
      css`
        & .masonry {
          display: flex;
          margin-left: -40px; /* gutter size offset */
          width: auto;
          &__column {
            padding-left: 40px; /* gutter size */
            background-clip: padding-box;
            & > * {
              margin-bottom: 30px;
            }
          }
        }
      `
    ]}
  >
    <Masonry breakpointCols={3} className="masonry" columnClassName="masonry__column">
      {children}
    </Masonry>
  </div>