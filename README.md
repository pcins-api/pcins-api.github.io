# PCINS Payment Gateway API Documentation

This repository contains the OpenAPI specification for the PCINS Payment Gateway API.

## API Documentation

View the live API documentation at: https://pcins-api.github.io/

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
npm install
```

### Preview Documentation
```bash
npm run dev
```

### Lint OpenAPI Spec
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

## OpenAPI Specification

The API specification is defined in `openapi.yaml`. You can:

- Import into Apidog, Postman, or Swagger UI
- Generate client SDKs using OpenAPI generators
- Use with Redocly CLI for documentation

## Updating Documentation

1. Edit `openapi.yaml` with your API changes
2. Validate: `npm run lint`
3. Preview: `npm run dev`
4. Commit and push to main branch
5. GitHub Actions will automatically deploy to GitHub Pages

## License

Proprietary - PCINS Payment Gateway Co., Ltd.
