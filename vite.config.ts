import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
  plugins: [react()],
  base:"/ui",
  define:{
    "__GQL_API_URL__":JSON.stringify("https://huddle.ridilla.eu/api/query"),
    "AUTH_URL":JSON.stringify(mode=="dev"?"127.0.0.1:4433":"huddle.ridilla.eu/auth")
  }
  }
})
