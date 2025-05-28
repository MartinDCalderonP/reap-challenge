# Reap Dynamic Secured Form Submission

## Description

This project allows an admin to create custom forms with sections and fields (text/number), generate a secure link, and share it so anyone can fill it out without authentication. Responses are stored and linked to the form and token.

## Tech Stack

- **Backend:** Express.js, Prisma, PostgreSQL
- **Frontend:** Next.js, Tailwind CSS
- **ORM:** Prisma
- **Testing:** Jest (backend)

## Repository Structure

```
reap-challenge/
├── backend/         # Express API, Prisma, logic and tests
│   ├── routes/      # Public and admin routes
│   ├── prisma/      # Schema and migrations
│   └── ...
├── frontend/        # Next.js + Tailwind, admin and public
│   ├── src/app/     # Pages, dynamic routes
│   └── ...
└── README.md        # (This file)
```

## Installation & Usage

### 1. Clone the repository

```bash
git clone <repo-url>
cd reap-challenge
```

### 2. Backend

```bash
cd backend
pnpm install
# Configure .env if needed (see .env.example)
pnpm prisma migrate deploy # or pnpm prisma migrate dev
pnpm run dev
```

By default, the backend runs at `http://localhost:4000`.

### 3. Frontend

```bash
cd ../frontend
pnpm install
pnpm run dev
```

By default, the frontend runs at `http://localhost:3000`.

## Usage Flow

### Admin

1. Go to `/` (e.g., http://localhost:3000/)
2. Log in with hardcoded credentials (`admin` / `reap2025`)
3. Create a form by adding sections and fields (text/number)
4. Generate the secure form link
5. Share the generated link

### Public

1. Access the generated link (e.g., http://localhost:3000/[token])
2. Fill out the dynamic form
3. Submit and see a success confirmation

## Testing

The backend includes basic tests for token validation and submissions:

```bash
cd backend
pnpm run test
```

## Notes

- Frontend and backend are decoupled.
- The admin area is protected by hardcoded login.
- Public forms do not require authentication and links are unguessable.
- The design is simple and functional, focused on UX and security.
