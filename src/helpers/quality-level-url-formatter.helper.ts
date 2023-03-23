export const getQualityLevelUrl = (originalUrl: string, qualityUrl: string) => {
  const urlBase = originalUrl.split('/').slice(0, -1).join('/');

  return `${urlBase}/${qualityUrl}`;
};
