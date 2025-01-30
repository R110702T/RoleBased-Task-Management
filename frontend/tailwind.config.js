/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Include all JS and JSX files in the src folder
        "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // Include Shadcn components if used
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
			
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                // Update these colors as needed
                primary: {
                    DEFAULT: "#3b82f6",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#ef4444",
                    foreground: "#ffffff",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};












//this was working but no style 

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}




//from here added
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
			
					sans: ['Roboto', 'Arial', 'sans-serif'], // Custom font
					heading: ['Poppins', 'sans-serif'], // Optional for headings
				 
           
            },
        },
    },
    plugins: [
		// require("@tailwindcss/forms"), // For better form styling
		// require("tailwindcss-animate"), // For animations
	],//require("tailwindcss-animate")
};



  