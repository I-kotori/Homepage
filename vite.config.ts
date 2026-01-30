// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 사용하는 프레임워크에 따라 다름

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 외부 접속 허용
    port: 5173,
    allowedHosts: [
      'butterflyjin.kr',
      'www.butterflyjin.kr' // 필요한 경우 추가
    ]
  }
})