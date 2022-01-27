import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import analyze from 'rollup-plugin-analyzer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react(),analyze({filter:(mod)=>{
      return mod.size!=0
    },hideDeps:true})],
    base:"/ui/",
  }
})
