export const getAssetUrl = (image: string): string => {
  return new URL(`../assets/img/${image}`, import.meta.url).href
}