import {useRouter} from 'next/router';
import posthog, {PostHogConfig} from 'posthog-js';
import {createContext, useContext, useEffect} from 'react';

export const usePostHog = (
  apiKey: string,
  config?: Partial<PostHogConfig>,
  name?: string,
) => {
  const router = useRouter();

  const subscribers: (() => void)[] = [];
  const subscribeLoaded = (subscriber: typeof subscribers[number]) => {
    if (posthog.__loaded) {
      subscriber();
    } else {
      subscribers.push(subscriber);
    }
  };

  useEffect(() => {
    posthog.init(
      apiKey,
      {
        ...config,
        loaded() {
          for (const s of subscribers) {
            s();
          }
        },
      },
      name,
    );

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return {subscribeLoaded};
};

export const PostHogContext = createContext<ReturnType<typeof usePostHog>>(
  null!,
);
export const usePostHogContext = () => useContext(PostHogContext);

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gaEvt = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: 'general' | 'engagement';
  label?: string;
  value?: number;
}) => {
  (window as any).gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const phEvt = posthog.capture;
