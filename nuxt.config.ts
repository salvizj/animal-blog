import { defineNuxtConfig} from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/supabase'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
    login: '/login',
    callback: '/error',
    exclude: ['/', '/register', '/about', '/login'],
    }
    },
});