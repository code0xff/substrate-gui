import '$lib/i18n';
import type { LayoutLoad } from './$types';
import { locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async () => {
  if (browser) {
    locale.set(navigator.language);
  }
  await waitLocale();
};