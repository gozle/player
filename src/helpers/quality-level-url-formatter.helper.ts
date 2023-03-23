export const getQualityLevelUrl = (originalUrl: string, qualityUrl: string) => {
  const urlBase = originalUrl.split('/').slice(0, -1).join('/');
  const levelUrlSplit = qualityUrl.split('/');

  return `${urlBase}/${levelUrlSplit[levelUrlSplit.length - 1]}`;
};
