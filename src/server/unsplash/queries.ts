import { UnsplashPhoto, UnsplashSearchResponse } from './models';

export async function getUnsplashPhoto(query: string): Promise<UnsplashPhoto> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?&query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&orientation=squarish`,
      {
        cache: 'no-store',
      }
    );
    const data: UnsplashSearchResponse = await res.json();
    return data.results[0];
  } catch (error) {
    console.error('Failed to fetch Unsplash photo', error);
    throw new Error('Failed to fetch daily picture');
  }
}
