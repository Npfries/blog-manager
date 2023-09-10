TODO:

- Rewrite as a monolithic Next.js application

Known security issues:

- JWT stored in localstorage
- refresh_token not implemented
- Placeholder secrets stored in .env files
- Symmetrical JWT secrets shared among services
- Naive or lacking sanitization of user input in several locations

Potential future security improvements considered:

- Implement asymmetrical algorithms for JWT auth (private/public key)
- Implement refresh_token and store JWT in memory only
- Implement a secrets store (perhaps in CI/CD pipeline, or at deployment to ECS, EKS, etc.)
- Unnecessary reloads in admin page to fetch state updates (such as on post creation / edit)
- Improve sanitization and validation of user input
