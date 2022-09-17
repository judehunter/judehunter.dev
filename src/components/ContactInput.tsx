import {useState} from 'react';
import tw from 'twin.macro';
import {GooeyLoader} from '../misc/GooeyLoader';
import {Button} from './Button';

export const ContactInput = ({...rest}) => {
  const [email, setEmail] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim().length) return;
    setSending(true);
    await fetch('/api/getInContact', {
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
    <div tw="relative" {...rest}>
      <form
        tw="
          border-2 border-white flex items-stretch border-radius[8px]
          transition-[border]
          // margin-left[-15px]
          // focus-within:(
          //   border-color[#7FEC9D]
          // )
          opacity-100 transition-opacity
        "
        css={[(justSubmitted || sending) && tw`opacity-0 pointer-events-none`]}
        onSubmit={submit}
      >
        <div tw="flex-grow flex-shrink">
          <input
            tw="width[100%] height[100%] min-width[1px] bg-transparent padding-left[15px] padding-right[15px] outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button tw="flex-shrink-0 margin[-2px]" {...({type: 'submit'} as any)} css={sending && tw`pointer-events-none`}>
          Get in contact
        </Button>
      </form>
      <div
        tw="absolute left-1/2 top-1/2 transform[translateY(-50%) translateX(-50%)]
        whitespace-nowrap opacity-0 transition-opacity pointer-events-none"
        css={[justSubmitted && tw`opacity-100`]}
      >
        Thank you! I will get in contact with you soon.
      </div>
      <div
        tw="absolute left-1/2 top-1/2 transform[translateY(-50%) translateX(-50%)]
        whitespace-nowrap opacity-0 transition-opacity pointer-events-none"
        css={[sending && tw`opacity-100`]}
      >
        <GooeyLoader />
      </div>
      {sending}
    </div>
  );
};
