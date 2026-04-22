/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#050505',
          secondary: '#0d0d0d',
          card: 'rgba(255,255,255,0.05)',
        },
        cyber: {
          cyan: '#00f2ff',
          red: '#ff003c',
          amber: '#ffab00',
          green: '#00ff88',
          purple: '#9d4edd',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.10)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        'cyber-cyan': '0 0 20px rgba(0,242,255,0.3), 0 0 60px rgba(0,242,255,0.1)',
        'cyber-red': '0 0 20px rgba(255,0,60,0.4), 0 0 60px rgba(255,0,60,0.15)',
        'cyber-amber': '0 0 20px rgba(255,171,0,0.3), 0 0 60px rgba(255,171,0,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
