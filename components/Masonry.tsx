import {css} from 'twin.macro';
import Masonry from 'react-masonry-css';

export const MasonryGrid = ({children, breakpointCols = 3, gutter = 40}) =>
  <div
    css={[
      css`
        & .masonry {
          display: flex;
          margin-left: -${gutter}px; /* gutter size offset */
          width: auto;
          &__column {
            padding-left: ${gutter}px; /* gutter size */
            background-clip: padding-box;
            & > * {
              margin-bottom: ${gutter}px;
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
    <MasonryGrid gutter={20} breakpointCols={2}>
      {
        photos.map((v, i) => (
          <img key={i} src={v} tw="rounded shadow" />
        ))
      }
    </MasonryGrid>
  )
}