import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from "@vitejs/plugin-basic-ssl"

import * as dotenv from 'dotenv'
dotenv.config()

let plugins;

if(process.env.MODE === "DEV") plugins=[vue(), basicSsl()]
if(process.env.MODE === "PROD") plugins=[vue()]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: plugins,
  server: {
    host: process.env.HOST,
    port: <number><unknown>process.env.PORT
  }
})


