# Description

This is a Next.js app that demonstrates how to use Next.js with Prisma and NextAuth.js.

## Features

- User management:
  - Admin can create, edit, view, and deactivate users.
- QR Code generation:
  - Users can generate QR codes for their links.
- Protected routes:
  - Dashboard accessible only to authenticated users.
- User profile:
  - View and manage the logged-in user's profile.
- Password hashing:
  - Passwords are hashed using bcrypt.
- JWT authentication:
  - Users are authenticated using JWT tokens.
- Database seeding:
  - Users are seeded into the database.
- Error handling:
  - Error messages are displayed to the user.
- Styling:
  - Tailwind CSS is used for styling.
- Built with modern tools:
  - **Next.js** for server-side rendering and routing.
  - **Prisma** for database management.
  - **React** for the frontend interface.

## Development

### Steps to start the app in development

1. Rename the .env.example to .env
2. Replace the enviroment variables
3. Execute the command:

```
npm install
```

4. Set up the db

```
docker-compose up -d
```

5. Execute these prisma commands:

```
npx prisma migrate dev; npx prisma generate
```

6. Execute SEED

```
npm run seed
```

7. Run server with command:

```
npm run dev
```

# Notes: default user

Default user data in the seed file

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
