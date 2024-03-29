import {Icon} from '@iconify/react';
import {useState} from 'react';
import tw from 'twin.macro';
import {GooeyLoader} from '../../misc/GooeyLoader';
import {gaEvt} from '../../misc/a7s';
import {posthog} from 'posthog-js';

const Input = ({val, onChange}) => {
  return (
    <div tw="flex justify-center mt-6 px-[32px] md:px-[43px]">
      <div tw="border-b-[2px] border-b-[rgb(127, 236, 157)] flex-grow">
        <input
          tw="background[none] w-full h-full focus:outline-none text-lg"
          placeholder="Your email here, please"
          value={val}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <button
        tw="mr-[-20px] md:mr-[-60px] flex-shrink-0 cursor-pointer"
        type="submit"
      >
        <Icon
          icon="fluent:arrow-curve-down-left-16-regular"
          fontSize={33}
          tw="text-white text-[rgb(127, 236, 157)] transition-colors relative bottom[-6.3px] left-[-6px]  transform[rotate(209deg)] "
        />
      </button>
    </div>
  );
};

export const SubscribeCTA = ({...rest}) => {
  const [email, setEmail] = useState('');
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
    }, 3000);
  };
  return (
    <div tw="max-w-[416px] mb-[20px]" {...rest}>
      <form
        tw="py-10 border-0 border-[rgb(127, 236, 157)] rounded-lg bg-[#192732] relative"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Icon
          icon="noto:rolled-up-newspaper"
          tw="absolute left-[-20px] top-[35px] font-size[3rem] hidden md:block"
        />
        <h1 tw="font-semibold text-xl md:font-size[1.4rem] px-[32px] md:px-[43px]">
          Subscribe to my newsletter
        </h1>
        <h2 tw="font-normal mt-2">
          <div tw="opacity-30 text-xs text-left px-[32px] md:px-[43px]">
            infrequent, high quality emails, opt out anytime
          </div>
          <div tw="relative">
            <div
              css={[
                (justSubmitted || sending) && tw`opacity-0 pointer-events-none`,
              ]}
            >
              <Input val={email} onChange={setEmail} />
            </div>
            <div
              tw="absolute left-1/2 top-1/2 transform[translateY(-50%) translateX(-50%)]
            whitespace-nowrap opacity-0 transition-opacity pointer-events-none"
              css={[justSubmitted && tw`opacity-100`]}
            >
              Thank you!
            </div>
            <div
              tw="absolute left-1/2 top-1/2 transform[translateY(-50%) translateX(-50%)]
            whitespace-nowrap opacity-0 transition-opacity pointer-events-none"
              css={[sending && tw`opacity-100`]}
            >
              <GooeyLoader />
            </div>
          </div>
        </h2>
      </form>
    </div>
  );
};
