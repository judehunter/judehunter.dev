import {useState, createContext, useRef, useEffect, useContext} from 'react';
import {GithubIcon, LinkedInIcon, PaperplaneIcon, TwitterIcon} from './svgs';

export const SectionHeader = ({children}) => {
  return (
    <h1 tw="font-medium [font-size: 20px] text-gold-7 md:(ml-[282px])">
      {children}
    </h1>
  );
};

export const GetInContactSection = () => {
  return (
    <div tw="flex items-center">
      <a
        tw="flex items-center text-yellow-11 gap-x-1.5"
        href="mailto:jude@judehunter.dev"
        target="_blank"
      >
        <PaperplaneIcon tw="-mb-0.5" />
        <span tw="font-medium">get in contact</span>
      </a>
      <a
        href="https://github.com/judehunter"
        rel="noopener noreferrer"
        target="_blank"
        tw="p-2 -m-2 ml-4"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/jude-hunter"
        rel="noopener noreferrer"
        target="_blank"
        tw="p-2 -m-2 ml-3"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://twitter.com/judehunterdev"
        rel="noopener noreferrer"
        target="_blank"
        tw="p-2 -m-2 ml-3"
      >
        <TwitterIcon tw="-mb-0.5" />
      </a>
    </div>
  );
};

export type NavSection = 'about' | 'resume' | 'articles' | 'newsletter';

export const useNavContextValue = () => {
  const [visible, setVisible] = useState<NavSection>('about');

  return {visible, setVisible};
};

export const NavContext = createContext<ReturnType<typeof useNavContextValue>>(
  null!,
);

export const useIntersectNav = (section: NavSection) => {
  const ref = useRef<HTMLDivElement>(null!);
  const {setVisible} = useContext(NavContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0) {
          setVisible(section);
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

export const IdOffset = ({id}) => {
  return <div id={id} tw="relative -top-24" />;
};
