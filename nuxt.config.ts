// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,
  app: {
    head: {
      title: "Painel Eldorado",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/eld.ico", // Caminho da imagem dentro de `/public`
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  imports: {
    dirs: ["stores/**/**"],
  },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    public: {
      urlAPI: process.env.NUXT_ENV_API_URL || "",
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
