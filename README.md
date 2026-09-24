# Express + TypeScript Starter

A small Express API written in TypeScript, tested with Jest. It includes one
working example feature (notes) that you can read and copy from.

## Requirements

- Node.js 20 or newer (`node -v` to check)

## Setup

```bash
npm install
cp .env.example .env
```

## Run it

```bash
npm run dev
```

The server starts on http://localhost:3000 and restarts when you save a file.

Try it:

```bash
curl http://localhost:3000/health

curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My first note","content":"Hello"}'

curl http://localhost:3000/api/notes
```

## Test it

```bash
npm test              # run all tests
npm run typecheck     # check TypeScript types
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the server in watch mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |
| `npm test` | Run the Jest tests |
| `npm run typecheck` | Type-check without building |

## Project structure

```
src/
  app.ts          builds the Express app (no listen)
  server.ts       starts the server
  config.ts       reads environment variables
  routes/         URL paths -> controller functions
  controllers/    read the request, call a service, send the response
  services/       business logic
  validators/     zod schemas that check request bodies
  middleware/     validation and error handling
  utils/          small helpers (HttpError, asyncHandler)
tests/            Jest + Supertest tests
```

## API

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/notes` | List notes |
| GET | `/api/notes/:id` | Get one note |
| POST | `/api/notes` | Create a note (`title` required, `content` optional) |
| PATCH | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

Errors always look like `{ "error": "message" }`.

## Working on a task

1. Check out your task branch: `git fetch && git checkout <branch-name>`
2. Make your changes and add or update tests.
3. Run `npm test` and `npm run typecheck` until both pass.
4. Commit and push: `git push`

Every push runs the same checks on GitHub Actions. You can see the result in
the Actions tab of your repository.

## Tips

- Throw `new HttpError(404, 'message')` to return an error response.
- Express 4 does not catch errors in `async` handlers automatically. Wrap them
  with `asyncHandler` from `src/utils/async-handler.ts`.
- Notes are stored in memory, so they reset when the server restarts.
