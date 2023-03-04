import React, { useEffect, useState } from 'react';
import { VASTClient, VastResponse } from 'vast-client';

export const useAd = (vast?: string) => {
  const [ad, setAd] = useState<VastResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (vast) {
      const vastClient = new VASTClient();
      vastClient.get(vast).then((res) => {
        if (isMounted) setAd(res);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [vast]);

  return ad;
};
