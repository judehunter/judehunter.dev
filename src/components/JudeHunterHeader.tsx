import tw from 'twin.macro';
import Link from 'next/link';

export const JudeHunterHeader = () => {
  return (
    <Link href="/" passHref>
      <a tw="block text-center font-bold [font-size: 20px] pt-6 text-gold-12">
        jude hunter
      </a>
    </Link>
  );
};
