Known security issues

- JWT stored in localstorage
- refresh_token not implemented
- Placeholder secrets stored in .env files
- Symmetrical JWT secrets shared among services

Improvements that should be considered:

- Implement asymmetrical algorithms for JWT auth (private/public key)
- Implement refresh_token and store JWT in memory only
- Implement a secrets store (perhaps in CI/CD pipeline, or at deployment to ECS, EKS, etc.)
