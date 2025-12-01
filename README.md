Tasker - A Modern Task Management App

Description: This is a modern task management app built with Next.js, Prisma, and PostgreSQL. It includes authentication with Google and GitHub.

## Screenshots
(Coming soon)

## Features
- Google/GitHub authentication
- User session handling
- PostgreSQL database with Prisma
- Task CRUD (Coming soon)
- Responsive design with TailwindCSS
- Modern UI with shadcn/ui

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth Authentication
- Vercel (Deployment)

## Prerequisites
- Node.js (v18+)
- A Neon PostgreSQL database
- Google and GitHub OAuth credentials


## Environment Variables
To run this project, create a .env.local file and add:

DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_ID=
GITHUB_SECRET=


## Installation

1. Clone the repository:
   git clone <your-repo-url>

2. Install dependencies:
   npm install

3. Apply Prisma migrations:
   npx prisma migrate dev

4. Start the development server:
   npm run dev

## Project Structure
/app
  /api
  /dashboard
/prisma
  schema.prisma

## What I Learned
- Integrating NextAuth with Prisma
- Working with the App Router in Next.js
- Connecting a cloud PostgreSQL database (Neon)
- Creating API routes with proper error handling
- Designing modern UI with Tailwind and shadcn/ui

## Status
In progress

## License
MIT
