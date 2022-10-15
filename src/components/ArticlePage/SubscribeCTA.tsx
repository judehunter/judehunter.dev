import {Icon} from '@iconify/react';
import {useState} from 'react';
import tw from 'twin.macro';
import {GooeyLoader} from '../../misc/GooeyLoader';
import {evt} from '../../misc/gtag';

const Input = ({val, onChange}) => {
  return (
    <div tw="flex justify-center mt-6 px-8">
      <div tw="border-b-[2px] border-b-[rgb(127, 236, 157)] max-w-[342px] flex-grow">
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
          fontSize={34}
          tw="text-white text-[rgb(127, 236, 157)] transition-colors relative bottom[-7px] left-[-6px]  transform[rotate(210deg)] "
        />
      </button>
    </div>
  );
};

export const SubscribeCTA = () => {
  const [email, setEmail] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = async () => {
    if (!email.trim().length) return;
    setSending(true);
    evt({action: 'subscribe_newsletter', category: 'general'});
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
    <div tw="max-w-[416px] mb-[100px] mx-auto px-2">
      <form
        tw="py-10 border-0 border-[rgb(127, 236, 157)] rounded-lg bg-[#192732]"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
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
