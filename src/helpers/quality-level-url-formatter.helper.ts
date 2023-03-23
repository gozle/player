export const getQualityLevelUrl = (originalUrl: string, qualityUrl: string) => {
  const levelUrlSplit = qualityUrl.split('/');
  const urlBase = originalUrl
    .split('/')
    .slice(0, -levelUrlSplit.length)
    .join('/');

  return urlBase.length ? `${urlBase}/${qualityUrl}` : qualityUrl;
};
