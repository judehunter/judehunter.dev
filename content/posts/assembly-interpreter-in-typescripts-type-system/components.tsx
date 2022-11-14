import tw from 'twin.macro';

export {Fools} from './Fools';

export {
  Note,
  Info,
  Idea,
} from '../../../src/components/ArticlePage/components/Note';

export const ShowcaseImage = () => {
  return (
    <div>
      <img
        tw="md:hidden"
        src="/media/assemblyfib.png"
        alt="Image showing the fibonacci sequence implemented in ts-asm"
      />
      <img
        tw="hidden md:block"
        src="/media/assemblyfib2.png"
        alt="Image showing the fibonacci sequence implemented in ts-asm"
      />
    </div>
  );
};
