# Fortius Monorepo

## Project Overview
Turborepo monorepo with 3 Next.js frontends and a Go backend.

## Apps
| App | Path | Port | Purpose |
|-----|------|------|---------|
| Fortius | `apps/fortius` | 3000 | Main Fortius website |
| Fortitude | `apps/fortitude` | 3001 | Fortitude website |
| Intools | `apps/intools` | 3002 | Internal tooling |
| API | `apps/api` | 8080 | Go backend |

## Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Go 1.23
- **Monorepo**: Turborepo + pnpm workspaces
- **Package manager**: pnpm

## Shared Packages
| Package | Name | Purpose |
|---------|------|---------|
| `packages/ui` | `@fortius/ui` | Shared React components (used by all 3 FEs) |
| `packages/typescript-config` | `@fortius/typescript-config` | Shared tsconfig bases |
| `packages/eslint-config` | `@fortius/eslint-config` | Shared ESLint rules |

## Common Commands
```bash
pnpm install           # install all workspace dependencies
pnpm turbo dev         # run all 3 Next.js apps in parallel
pnpm turbo build       # build all apps
pnpm turbo lint        # lint all apps
pnpm turbo type-check  # type-check all apps

# Go API
cd apps/api && go run ./cmd/server    # dev
cd apps/api && go build -o bin/server ./cmd/server  # build
```

## Go Backend Structure
```
apps/api/
├── cmd/server/main.go        # entrypoint
├── internal/
│   ├── controllers/          # HTTP handlers
│   ├── entity/               # Data entities
│   ├── middleware/           # HTTP middleware
│   ├── models/               # DB models
│   ├── repositories/         # repository to db
│   └── services/             # business logic
└── pkg/                      # reusable/exported Go packages
```

## Adding Shared UI Components
Add exports to `packages/ui/src/index.ts`. All 3 Next.js apps already depend on `@fortius/ui` and have `transpilePackages` set in their `next.config.ts`.

## Notes
- Each Next.js app uses `@fortius/typescript-config/nextjs.json` as its tsconfig base
- Go module path: `github.com/fortius/api`
