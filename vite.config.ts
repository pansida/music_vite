import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {visualizer} from "rollup-plugin-visualizer"
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({resolvers:[ElementPlusResolver()]}),
    Components({resolvers:[ElementPlusResolver()]}),
    visualizer({open:true}),
    Components({
      resolvers:[
        AntDesignVueResolver({
          importStyle: true, // css in js
        }),
      ]
    })
  ],
  server:{
    proxy:{
      '/api':{
        target:"https://cloud.pansida.cn",
        changeOrigin:true,
        ws:true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      }
    ],
    extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己增减
  }
})


