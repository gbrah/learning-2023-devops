import { defaultTheme } from "@vuepress/theme-default";
import { searchPlugin } from "@vuepress/plugin-search";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import { seoPlugin } from "@vuepress/plugin-seo";
import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
  
  base: "/learning-2023-devops/",
  port: 3000,

  head: [
    ["link", { rel: "icon", href: "/learning-2023-devops/favicon.ico" }],
    [
      "link",
      { rel: "manifest", href: "/learning-2023-devops/manifest.webmanifest" },
    ],
    ['meta', { name: 'theme-color', content: '#027DFD' }],
    
  ],

  theme: defaultTheme({
        logo: 'logo_worldline.png',
        repo: "https://github.com/gbrah/learning-2023-devops",
        repoLabel: "⭐ Contribute!",
        

        sidebar: [
          { text: 'Home', link: '/' },
          "/overview/",
          "/game/",
          "/shell/",
          "/virt/", 
          "/container/", 
          "/ci/", 
          "/orchestration/", 
          "/prov/", 
          //"/cloud/", 
          //"/ms/", 

        ], 
        }),
        bundler: viteBundler({
          viteOptions: {},
          vuePluginOptions: {},

      
  }),
  


  plugins: [
    seoPlugin({
      hostname: "https://worldline.github.io/gbrah/learning-2023-devops",
    }),
  ],
});
