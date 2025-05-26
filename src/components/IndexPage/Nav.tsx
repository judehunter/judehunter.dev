import {useState, useRef, useEffect, useContext} from 'react';
import {m} from 'framer-motion';
import {NavContext} from './misc';
import tw from 'twin.macro';

const NavItem = ({children, section, layoutId}) => {
  const {visible} = useContext(NavContext);
  const active = visible === section;
  return (
    <li
      tw="flex flex-col items-center cursor-pointer hover:bg-gold-2 py-1.5 px-4 first:pl-6 last:pr-6 transition-colors"
      onClick={(e) => {
        document
          .getElementById(section)!
          .scrollIntoView({behavior: 'smooth', block: 'start'});

        history.replaceState(
          null,
          '',
          section === 'about' ? '/' : `#${section}`,
        );
      }}
    >
      <span tw="font-medium text-gold-12 [font-size: 12px] md:([font-size: 16px])">
        {children}
      </span>
      <div tw="h-1 flex justify-center mt-1">
        {active ? (
          <m.div
            tw="w-3 h-1 bg-yellow-11 rounded-full"
            layoutId={`${layoutId}Active`}
            transition={{type: 'spring', bounce: 0.3}}
          />
        ) : null}
      </div>
    </li>
  );
};

const ActualNav = ({layoutId}) => {
  return (
    <ul tw="items-center border border-gold-4 flex justify-center rounded-full w-full md:(w-auto) overflow-hidden">
      <NavItem section="about" {...{layoutId}}>
        about
      </NavItem>
      <NavItem section="resume" {...{layoutId}}>
        resumé
      </NavItem>
      <NavItem section="articles" {...{layoutId}}>
        articles
      </NavItem>
      <NavItem section="newsletter" {...{layoutId}}>
        newsletter
      </NavItem>
    </ul>
  );
};

export const Nav = () => {
  const [stuck, setStuck] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const topMargin = 120;

    const observer = new IntersectionObserver(
      ([e]) => {
        setStuck(e.boundingClientRect.top < topMargin);
      },
      {threshold: [1], rootMargin: `-${topMargin}px 0px 0px 0px`},
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      tw="sticky top-[-1px] border-t border-t-transparent max-w-[840px] flex mx-auto mt-5 pt-4 z-[999999]"
      ref={ref}
    >
      <div tw="hidden md:([flex-basis: 282px] block)" />
      <div tw="md:block hidden">
        <m.div
          tw="max-w-[555px] [backdrop-filter: blur(10px)] -ml-6 rounded-full"
          animate={stuck ? {marginLeft: '-80px'} : {marginLeft: '-24px'}}
          transition={{type: 'tween', ease: 'easeOut'}}
          initial={false}
        >
          <div tw="items-center flex">
            <m.div
              tw="text-center font-bold text-gold-12 overflow-hidden whitespace-nowrap mt-[-10px]"
              animate={
                stuck
                  ? ({
                      width: 'auto',
                      opacity: 1,
                      transition: {
                        type: 'tween',
                        ease: 'easeOut',
                        opacity: {
                          times: [0, 0.3],
                        },
                      },
                    } as any)
                  : ({
                      width: '0px',
                      opacity: 0,
                      transition: {
                        type: 'tween',
                        ease: 'easeOut',
                        opacity: {
                          times: [0, 0.7],
                        },
                      },
                    } as any)
              }
              initial={false}
            >
              <div tw="mr-4 pl-6">jude hunter</div>
            </m.div>
            <ActualNav layoutId="desktopNav" />
          </div>
        </m.div>
      </div>
      <div tw="flex grow justify-center md:hidden [backdrop-filter: blur(10px)] rounded-full w-full -mx-2">
        <ActualNav layoutId="mobileNav" />
      </div>
    </div>
  );
};
