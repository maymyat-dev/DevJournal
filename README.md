# ShareNest

A full-stack content sharing platform built with Next.js, TypeScript, Prisma, and PostgreSQL. ShareNest allows users to create and share content, upload images, engage with the community through voting, and premium user through Stripe-powered subscriptions.

## Live Demo

https://dev-journal-woad.vercel.app/

## Features

* Secure authentication and user profiles
* Content publishing and management
* Image uploads with UploadThing
* Community voting system
* Advanced search and pagination
* Premium subscription billing with Stripe
* Stripe webhook integration for subscription synchronization
* Premium badges and membership management
* Responsive design for desktop and mobile

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* Next.js Server Actions
* Prisma ORM
* PostgreSQL

### Authentication

* Better Auth

### Payments

* Stripe Checkout
* Stripe Webhooks

### File Uploads

* UploadThing

## Key Learnings

* Building subscription-based workflows with Stripe
* Managing webhook-driven architectures
* Production debugging and deployment troubleshooting
* Designing scalable database relationships with Prisma
* Building secure authentication and authorization flows

## Getting Started

Clone the repository:

```bash
git clone https://github.com/maymyat-dev/DevJournal.git
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=
DIRECT_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
RESEND_API_KEY=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
UPLOADTHING_TOKEN=
NEXT_PUBLIC_APP_URL=
STRIPE_SECRET_KEY=
STRIPE_PREMIUM_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

Run the development server:

```bash
npm run dev
```

## Author

May

GitHub: https://github.com/maymyat-dev/DevJournal
