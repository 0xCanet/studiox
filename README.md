# Studi.0x — Design Agency Website

A modern, high-performance website for Studi.0x design agency, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- **Bilingual Support**: English and French (i18n)
- **Smooth Animations**: Framer Motion and Lenis smooth scroll
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4

## Tech Stack

- **Framework**: Next.js 16.0.7
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.25
- **Smooth Scroll**: Lenis 1.3.15
- **PDF Viewer**: @react-pdf-viewer/core 3.12.0

## Getting Started

Install dependencies:

```bash
npm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
app/
├── components/          # React components
├── projects/           # Project detail pages
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The project is optimized for deployment on Vercel. Simply push to your repository and Vercel will automatically build and deploy.

For other platforms, run `npm run build` and serve the `.next` directory.
