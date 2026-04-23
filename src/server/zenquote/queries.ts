import { Quote } from './models';

export async function getDailyZenquote(): Promise<Quote> {
  try {
    const res = await fetch('https://zenquotes.io/api/today', {
      cache: 'no-store',
    });
    const data: Quote[] = await res.json();
    return data[0];
  } catch (error) {
    console.error('Failed to fetch Zen quote', error);
    throw new Error('Failed to fetch daily quote');
  }
}
