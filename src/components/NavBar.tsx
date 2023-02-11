import {m} from 'framer-motion';
import Link from 'next/link';
import {useRouter} from 'next/router';
import tw, {css, theme} from 'twin.macro';
import {BareLogo, Logo} from './Logo';
import {useState, useRef, useEffect} from 'react';
import {keyframes} from '@emotion/react';
import {GooeyLoader} from '../misc/GooeyLoader';
import { gaEvt } from '../misc/a7s';
import { posthog } from 'posthog-js';

const NavLink = ({href, children}) => {
  return (
    <Link passHref {...{href}}>
      <a>{children}</a>
    </Link>
  );
};

const rotate = keyframes`
  from {
    background-position: 0% 0%, 0 0;
  }
  25% {
    background-position: 100% 0%, 0 0;
  }
  50% {
    background-position: 100% 100%, 0 0;
  }
  75% {
    background-position: 0% 100%, 0 0;
  }
  to {
    background-position: 0% 0%, 0 0;
  }
`;

function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query]);

  return matches;
}

const Newsletter = ({
  open,
  onChangeOpen,
}: {
  open: boolean;
  onChangeOpen: (val: boolean) => void;
}) => {
  const [email, setEmail] = useState('');

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  const [justSubmitted, setJustSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async () => {
    if (!email.trim().length) return;
    setSending(true);
    gaEvt({action: 'subscribe_newsletter', category: 'general'});
    posthog.capture('subscribed to newsletter', {category: 'general'});
    await fetch('/api/sub', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    setJustSubmitted(true);
    setSending(false);
    setTimeout(() => {
      setJustSubmitted(false);
      setEmail('');
      onChangeOpen(false);
    }, 3000);
  };

  return (
    <>
      <div tw="relative">
        <div tw="absolute left-2 top-1/2 transform[translateY(-50%)] flex items-center">
          {/* <div tw="ml-[-35px] w-0 mr-[35px]" onClick={() => setOpen(false)}>
            x
          </div> */}
          <m.span
            variants={{
              hidden: {
                opacity: 1,
                pointerEvents: 'auto',
                transition: {
                  delay: 0.6,
                },
              },
              shown: {opacity: 0, pointerEvents: 'none'},
            }}
            role="button"
            onClick={() => onChangeOpen(true)}
          >
            Newsletter
          </m.span>
          {/* <m.span variants={{hidden: {opacity: 0}, shown: {opacity: }}}>
            Newsletter
          </m.span> */}
        </div>
        <m.div
          variants={{
            hidden: {
              width: '82px',
              opacity: 0,
              pointerEvents: 'none',
              transition: {
                delay: 0.4,
              },
            },
            shown: {
              width: '200px',
              opacity: 1,
              pointerEvents: 'auto',
            },
            after: {opacity: 0, width: '200px'},
          }}
          animate={
            open ? (sending || justSubmitted ? 'after' : 'shown') : 'hidden'
          }
          tw="p-[1px] h-[30px] rounded"
          css={[
            css`
              animation: ${rotate} 1s linear infinite;
              background-image: radial-gradient(
                  ellipse 100% 100% at 50% 50%,
                  #ffffff44,
                  transparent
                ),
                radial-gradient(
                  ellipse 50% 50% at 0% 30%,
                  #ffffff22,
                  transparent
                );
              // radial-gradient(
              //   ellipse 100% 100% at 100% 00%,
              //   #ffffff22,
              //   transparent
              // );
              background-size: 200% 200%;
              background-repeat: no-repeat;
            `,
          ]}
        >
          <form
            tw="w-full h-full"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              ref={inputRef}
              tw="bg-[#12142d] w-full h-full min-w-0 px-2 py-1 outline-none rounded"
              placeholder="Your email here"
              onBlur={() => {
                if (open && !sending && !justSubmitted) {
                  onChangeOpen(false);
                }
              }}
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </form>
        </m.div>
        <m.div
          tw="absolute right-0 top-1/2 transform[translateY(-50%)] pointer-events-none flex justify-end"
          variants={{
            true: {opacity: 1, transition: {delay: 0.2}},
            false: {opacity: 0},
          }}
          animate={`${sending}`}
        >
          <GooeyLoader />
        </m.div>
        <m.div
          tw="absolute right-0 top-1/2 transform[translateY(-50%)] pointer-events-none whitespace-nowrap"
          variants={{
            true: {opacity: 1, transition: {delay: 0.2}},
            false: {opacity: 0},
          }}
          animate={`${justSubmitted}`}
        >
          Thank you!
        </m.div>
      </div>
    </>
  );
};

export const NavBar = () => {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const isScreenMd = useMediaQuery(`(min-width: ${theme`screens.md`})`);

  return (
    <>
      <div
        tw="fixed left-0 top-0 right-0 text-[#f7f8f8] z-[999999999]"
        css={[
          css`
            // mask: linear-gradient(
            //   to top,
            //   rgba(0, 0, 0, 0) 0%,
            //   rgba(0, 0, 0, 1) 40px
            // );
            // background-image: linear-gradient(
            //   to bottom,
            //   #000212 0px,
            //   #00021200 20px
            // );
          `,
        ]}
      >
        <div
          css={[
            css`
              z-index: 1;
              &::before {
                content: '';
                position: absolute;
                inset: -1px 0 -60%;
                backdrop-filter: blur(12px);
                z-index: 0;
                mask: linear-gradient(to bottom, black 50px, transparent);
                background-image: linear-gradient(
                  to bottom,
                  #000212 0px,
                  #00021200 30px
                );
              }
            `,
          ]}
        />
        <m.div
          tw="max-w-[600px] mx-auto px-6 box-sizing[content-box] relative"
          animate={newsletterOpen ? 'shown' : 'hidden'}
          initial="hidden"
        >
          <div
            tw="
            py-0 flex items-center justify-between font-medium text-[14px] border-b border-b-[#ffffff22] mb-0
            w-full
          "
          >
            <div tw="flex items-center">
              <Link href="/" passHref>
                <a tw="mr-[24px] my-2">
                  <BareLogo tw="w-[30px] h-[30px] box-sizing[content-box]" />
                </a>
              </Link>
              <m.div
                tw="flex items-center flex-grow [& > *]:(px-[12px] my-2) mx-[-12px] overflow-hidden"
                variants={{
                  hidden: {width: 'auto', opacity: 1, transition: {delay: 0.2}},
                  shown: isScreenMd
                    ? {width: 'auto', opacity: 1}
                    : {width: '0px', opacity: 0},
                }}
              >
                <Link href="/" passHref>
                  <a tw="hidden md:block">Portfolio</a>
                </Link>
                <Link href="/blog" passHref>
                  Blog
                </Link>
                <Link href="/#work" passHref>
                  Work
                </Link>
                <Link href="/#contact" passHref>
                  Contact
                </Link>
              </m.div>
            </div>
            <div tw="ml-[24px] flex items-center">
              <Newsletter
                open={newsletterOpen}
                onChangeOpen={setNewsletterOpen}
              />
            </div>
          </div>
        </m.div>
      </div>
      <div
        tw="absolute left-0 top-0 right-0 height[1300px] pointer-events-none z-[0]"
        css={[
          css`
            background-image: radial-gradient(
              ellipse 80% 50% at 50% -20%,
              rgba(120, 119, 198, 0.3),
              transparent
            );
          `,
        ]}
      />
    </>
  );
};

export const NavBar3 = () => {
  const {pathname} = useRouter();
  return (
    <m.nav
      tw="
        fixed top-0 left-0 right-0 flex justify-center z-index[999999999]
        text-[#dadfe7]
      "
      initial={{opacity: pathname === '/' ? 0 : 1}}
      animate={{opacity: 1}}
      transition={{delay: 1}}
    >
      <div
        tw="absolute left-0 top-0 bottom-0 right-0 backdrop-filter[blur(4px)] z-index[0]"
        css={[
          css`
            mask: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 0) 100%
            );
          `,
        ]}
      />
      <div tw="absolute left-0 top-0 bottom-0 right-0 z-index[1] background-image[linear-gradient(to bottom, rgba(7,12,16,1) 20%, rgba(7,12,16,0) 90%)]" />
      <div tw="md:mt-4 flex-grow max-w-[800px] py-3 background-image[linear-gradient(to bottom, #070c10dd 25%, #0e151c00)] md:background-image[linear-gradient(to bottom, #070c10, #0e151c)] md:rounded-full grid grid-cols-5 gap-20 z-index[2] md:box-shadow[0 25px 25px rgba(0,0,0,0.15)]">
        <div tw="items-center justify-end space-x-20 col-span-2 hidden md:flex">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#work">Work</NavLink>
        </div>
        <Link href="/" passHref>
          <a tw="col-span-5 md:col-span-1 flex justify-center items-center">
            <BareLogo />
          </a>
        </Link>
        <div tw="items-center space-x-12 col-span-2 hidden md:flex">
          <NavLink href="/#work">Resumé</NavLink>
          <NavLink href="/#contact">Contact</NavLink>
        </div>
      </div>
    </m.nav>
  );
};

export const NavBar2 = () => {
  return (
    <m.div
      tw="
        fixed top-0 left-1/2 transform[translateX(-50%)]
        background-image[linear-gradient(0deg, rgba(13,13,15,.05) 0%, rgba(13,13,15,1) 80%)]
        backdrop-filter[blur(8px)]
        z-index[999999999]
        box-shadow[0 25px 25px rgba(0,0,0,0.15)]
      "
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 1}}
    >
      <div
        tw="
          flex items-center justify-center
          mx-auto max-width[1150px] padding-top[20px] md:padding-top[50px] px-6 md:px-10 pb-5 box-sizing[content-box]
        "
      >
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>

        <div tw="margin-left[50px] margin-right[60px] height[1px] flex-grow flex-shrink background-color[#FFFFFF] opacity-30 hidden md:block" />

        <div tw="hidden md:flex items-center justify-between flex-shrink-0 flex-basis[340px]">
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="#work">Work</NavLink>
          {/* <NavLink href="/blog">Resume</NavLink> */}
          <NavLink href="#contact">Contact</NavLink>
        </div>
      </div>
    </m.div>
  );
};
