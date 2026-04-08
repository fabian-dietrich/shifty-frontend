# Shifty — Frontend

React client for [Shifty](https://shifty.fabiandietri.ch), a shift scheduling app built for small teams.

**Backend repo:** [shifty-backend](https://github.com/fabian-dietrich/shifty-backend)

## Live demo

[shifty.fabiandietri.ch](https://shifty.fabiandietri.ch)

All demo accounts use the password `shifty2025`.

| Account | Role |
|---|---|
| sarah@shifty-demo.com | Admin |
| tom@shifty-demo.com | Employee |

## Tech stack

React 19, React Router 7, Axios, Vite.

## Features

- Weekly shift grid with color-coded team member assignments
- Admin dashboard for creating, editing, and staffing shifts
- JWT-based authentication with protected routes
- Responsive layout

## Local setup

```
bun install
cp .env.example .env   # set VITE_API_URL to your backend
bun run dev             # starts Vite dev server
```