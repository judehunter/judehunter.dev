import {Icon} from '@iconify/react';
import tw from 'twin.macro';
import {IdOffset, useIntersectNav} from './misc';
import {useState} from 'react';
import {gaEvt} from '../../misc/a7s';
import posthog from 'posthog-js';

export const NewsletterSection = () => {
  const ref = useIntersectNav('newsletter');

  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<
    null | 'sending' | 'submitted'
  >(null);

  const submit = async () => {
    if (!email.trim().length || submitState !== null) return;
    setSubmitState('sending');
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
    setSubmitState('submitted');
    setTimeout(() => {
      setEmail('');
      setSubmitState(null);
    }, 3000);
  };

  return (
    <div
      tw="
        max-w-[440px] mx-auto mt-20 p-4 rounded-[16px]
        [background: radial-gradient(103.2% 100% at 50% 100%, #3E382C 0%, rgba(38, 35, 28, 0.00) 100%);]
      "
      ref={ref}
    >
      <IdOffset id="newsletter" />
      <h1 tw="font-medium text-gold-12 [font-size: 20px]">
        Subscribe to my newsletter
      </h1>
      <h2 tw="font-medium text-gold-11 mt-1">
        infrequent, high quality emails, opt out anytime
      </h2>
      <form
        tw="flex items-center gap-x-6 mt-5 text-gold-11 font-medium"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {submitState === null ? (
          <>
            <input
              tw="outline-none bg-gold-1 grow h-[55px] rounded-[6px] px-6 placeholder:text-gold-8"
              placeholder="your email here"
            />
            <Icon
              icon="iconamoon:send-fill"
              width={36}
              height={36}
              tw="cursor-pointer"
            />
          </>
        ) : submitState === 'sending' ? (
          <div tw="h-[55px] grow flex items-center justify-center">
            Submitting...
          </div>
        ) : (
          <div tw="h-[55px] grow flex items-center justify-center">
            Thank you :{')'}
          </div>
        )}
      </form>
    </div>
  );
};
