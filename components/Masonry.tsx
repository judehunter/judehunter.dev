import {css} from 'twin.macro';
import Masonry from 'react-masonry-css';

export const MasonryGrid = ({children, breakpointCols = 3, gutterH = 40, gutterV = 60}: {children?, breakpointCols?, gutterH?, gutterV?}) =>
  <div
    css={[
      css`
        & .masonry {
          display: flex;
          margin-left: -${gutterH}px; /* gutter size offset */
          width: auto;
          &__column {
            padding-left: ${gutterH}px; /* gutter size */
            background-clip: padding-box;
            & > * {
              margin-bottom: ${gutterV}px;
            }
          }
        }
      `
    ]}
  >
    <Masonry breakpointCols={breakpointCols} className="masonry" columnClassName="masonry__column">
      {children}
    </Masonry>
  </div>

export const MasonryPhotos = ({photos}: {photos: string[]}) => {
  return (
    <MasonryGrid gutterH={20} gutterV={20} breakpointCols={2}>
      {
        photos.map((v, i) => (
          <img key={i} src={v} tw="rounded shadow" loading="lazy" />
        ))
      }
    </MasonryGrid>
  )
}