# Full-stack realtime chat vue hasura
- Real-time chat functionality using Hasura
- Data: PostgeSQL managed by Supabase
- Front-end: Vue + Vite, TailwindCSS
- Hosting: [Vercel](https://vercel.com/)

## Install
`npm install` to setup dependencies

## Hasura variables

Create a `.env` file with `VITE_GRAPHQL_HTTP_URI`, `VITE_GRAPHQL_WS_URI`, and `VITE_HASURA_ADMIN_SECRET` (see env.example)

## Setup your PostgreSQL project

The following database table name 'messages' is required:

| Field            | Type      |
| ---------------- | --------- |
| id               | BIGINT    |
| user_id          | BIGINT    |      
| username         | VARCHAR   |
| color            | VARCHAR   |
| message          | TEXT      |
| room_id          | BIGINT    |
| is_verified      | BOOLEAN   |
| created_at       | timestamp |

The following database table name 'users' is required:

| Field            | Type      |
| ---------------- | --------- |
| id               | BIGINT    |
| unique_id        | BIGINT    |      
| username         | VARCHAR   |
| is_verified      | BOOLEAN   |
| color            | VARCHAR   |
| created_at       | timestamp |

## Dev

`npm run dev` to run server on port 5173

## Build

`npm run build` to build the vue client

# Demo

[https://realtime-chatapp2023.vercel.app/](https://realtime-chatapp2023.vercel.app/)

!['demo'](https://realtime-chatapp2023.vercel.app/demo1.png "Dekstop View")
!['demo'](https://realtime-chatapp2023.vercel.app/demo2.jpg "Responsive Mobile View")
