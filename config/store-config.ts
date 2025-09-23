export const storeConfig = {
  name: 'One Product Store',
  slogan: 'The best product in the world',
  title: 'One Product Store',
  description: 'One product store selling the best product in the world.',

  contactEmail: 'contact@granqvist.dev',

  socialMedia: {
    twitter: 'https://www.twitter.com/yourstore',
    youtube: 'https://www.youtube.com/yourstore',
    facebook: 'https://www.facebook.com/yourstore',
    instagram: 'https://www.instagram.com/yourstore',
    pinterest: 'https://www.pinterest.com/yourstore',
  },
};

export const globalBanner = {
  enabled: true,
  text: 'Free shipping and returns on all orders',
};

export function getPageTitle(title?: string) {
  return title ? `${title} - ${storeConfig.title}` : storeConfig.title;
}
