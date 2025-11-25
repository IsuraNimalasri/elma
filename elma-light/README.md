# Cognito Clone (elma-light)

This is a clone of the Cognito Education website built with Next.js, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Magic UI (compatible)
- **CMS**: Prismic.io (configured in `src/prismicio.ts`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages Implemented

- **Landing Page**: `/` - Main marketing page with features and CTA.
- **Dashboard**: `/dashboard` (redirects to home view)
- **Course Overview**: `/courses/[subject]` - e.g., `/courses/biology`
- **Lesson View**: `/courses/[subject]/[topic]` - e.g., `/courses/biology/microscopes`

## Project Structure

- `src/app`: App router pages.
- `src/components/landing`: Components for the landing page.
- `src/components/dashboard`: Components for the dashboard.
- `src/components/ui`: Shared UI components (shadcn).
