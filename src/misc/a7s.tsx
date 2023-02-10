import {useRouter} from 'next/router';
import posthog, {PostHogConfig} from 'posthog-js';
import {useEffect} from 'react';

export const usePostHog = (
  apiKey: string,
  config?: Partial<PostHogConfig>,
  name?: string,
): void => {
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init(apiKey, config, name);

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
};

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
