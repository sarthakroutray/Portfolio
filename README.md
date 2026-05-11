# Sarthak's Portfolio

A modern, interactive portfolio website built with Next.js 16, featuring stunning animations, 3D graphics, and a seamless user experience.

## Features

- **Interactive Animations**: Smooth transitions and pixel-blast effects powered by GSAP
- **3D Graphics**: Three.js integration for immersive visual elements
- **Dark/Light Theme Toggle**: Theme support via next-themes
- **Fully Responsive**: Mobile-first design with Tailwind CSS
- **Fast Performance**: Built with Next.js 16 using Turbopack for optimized development
- **Email Integration**: Contact form with EmailJS
- **Analytics**: Vercel Analytics integration for tracking
- **SEO Optimized**: Dynamic metadata, sitemap, and robots.txt
- **TypeScript**: Full type safety across the codebase

## Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React meta-framework
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)

### Development
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: ESLint with Next.js config
- **Node Version**: Compatible with Node 18+

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables (if needed for EmailJS):
```bash
cp .env.local.example .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the portfolio in action.

## Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build for production
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint checks

## Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Home page
│   ├── robots.ts                # SEO robots configuration
│   ├── sitemap.ts               # XML sitemap
│   ├── education/               # Education page
│   ├── projects/                # Projects showcase page
│   └── skills/                  # Skills page
├── components/
│   ├── animations/              # Animation components
│   │   ├── GsapProvider.tsx     # GSAP initialization & context
│   │   ├── PixelBlast.tsx       # Pixel blast effect
│   │   ├── TargetCursor.tsx     # Custom cursor
│   │   └── ThreeSceneLoader.tsx # 3D scene loader
│   ├── hero/                    # Hero section components
│   │   ├── HeroSection.tsx      # Main hero display
│   │   ├── AboutSection.tsx     # About me section
│   │   ├── ContactSection.tsx   # Contact form
│   │   └── SideRail.tsx         # Navigation rail
│   ├── navbar/                  # Navigation bar
│   ├── project-card/            # Project display cards
│   └── theme-toggle/            # Theme switcher
├── lib/
│   ├── constants.ts             # App-wide constants
│   └── utils.ts                 # Utility functions
├── styles/
│   └── globals.css              # Global styles
├── public/                       # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.ts               # Next.js configuration
```

## Pages & Routes

- `/` - Home page with hero section, about, and featured projects
- `/projects` - Complete projects showcase
- `/skills` - Technical skills display
- `/education` - Education background

## Development Notes

### Animation Performance
The portfolio uses GSAP and Framer Motion for smooth animations. For optimal performance:
- Animations are loaded conditionally to avoid blocking initial page render
- Three.js scenes are lazy-loaded via `ThreeSceneLoader` component
- Background effects in `PixelBlastBackground` are GPU-optimized

### Theme System
The portfolio includes dark/light mode support:
- Theme state is managed by `next-themes`
- Tailwind CSS dark mode utilities are used for styling
- User preference is persisted in localStorage

### Email Integration
Contact form uses EmailJS for email delivery:
- Configure your EmailJS credentials in environment variables
- Ensure EmailJS is initialized before sending emails

## Production Deployment

### Vercel (Recommended)
The portfolio is optimized for Vercel deployment:

1. Push your code to GitHub/GitLab/Bitbucket
2. Import in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel automatically detects Next.js and configures build settings
4. Deploy with one click

### Environment Variables
Add these to your Vercel project settings:
- EmailJS service configuration (if using contact form)
- Other analytics or third-party service keys

### Build Command
```bash
npm run build
```

### Output
The production build is optimized with:
- Static generation for better performance
- Image optimization via Next.js Image component
- CSS and JavaScript minification

## Performance Optimizations

- **Next.js Turbopack**: Fast refresh during development
- **Image Optimization**: Vercel Image Optimization for responsive images
- **Code Splitting**: Automatic code splitting per route
- **Analytics**: Vercel Analytics for performance monitoring
- **SEO**: Dynamic metadata and structured data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to fork and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

## Contact

For questions or inquiries about this portfolio, please use the contact form on the website or reach out directly.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
