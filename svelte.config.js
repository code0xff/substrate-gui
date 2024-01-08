import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static'; // 이것은 adapter-auto에 의해 변경됨
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // preprocessors에 관한 더 많은 정보를 위해
  // https://github.com/sveltejs/svelte-preprocess 참고
  preprocess: [preprocess(), vitePreprocess({})],

  kit: {
    adapter: adapter(),
    alias: {
      "@/*": "./src/*"
    }
  }
};

export default config;
