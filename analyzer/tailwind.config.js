/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				'primary-500': '#877EFF',
				'dark-1': '#000000',
				'dark-2': '#09090A',
				'dark-3': '#101012',
				'dark-4': '#1F1F22',
				'light-1': '#FFFFFF',
				'light-2': '#EFEFEF',
				'light-3': '#7878A3',
				'light-4': '#5C5C7B',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeInRight: {
					'0%': { transform: 'translateZ(100%)', opacity: 0 },
					'100%': { transform: 'translateZ(0)', opacity: 1 },
				},
				fadeInLeft: {
					'0%': { transform: 'translateY(100%)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				moveUpAndDown: {
					'0%': { transform: 'translateY(50%)', opacity: 0 },
					'50%': { transform: 'translateY(0)', opacity: 1 },
					'100%': { transform: 'translateY(50%)', opacity: 0 },
				},
				moveCardUpAndDown: {
					'0%': { transform: 'translateY(50%)', opacity: 1 },
					'50%': { transform: 'translateY(0)', opacity: 1 },
					'100%': { transform: 'translateY(50%)', opacity: 1 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeInRight: 'fadeInRight 3s ease-in-out forwards',
				fadeInLeft: 'fadeInLeft 7s ease-in-out forwards',
				moveUpAndDown: 'moveUpAndDown 4s ease-in-out infinite',
				moveCardUpAndDown: 'moveCardUpAndDown 4s ease-in-out infinite',
			}
		},
	},
	plugins: [require("tailwindcss-animate")],
}

