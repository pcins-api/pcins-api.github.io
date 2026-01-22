# AGENTS.md - PCINS API Documentation (Redoc + OpenAPI)

This is a Redoc-based API documentation site for PCINS Payment Gateway, using OpenAPI 3.0 specification.

## Build Commands

```bash
# Install dependencies
npm install

# Preview documentation locally
npm run dev

# Lint OpenAPI spec
npm run lint

# Build static documentation to dist/
npm run build
```

## Local Preview

Run `npm run dev` to preview docs at http://localhost:8080

## Code Style Guidelines

### OpenAPI Specification (openapi.yaml)
- Use OpenAPI 3.0.3 format
- Include `info` section with title, description, version, contact
- Define servers for sandbox and production environments
- Group endpoints by tags (Authentication, Payments, Refunds, Webhooks)

### Schema Definitions
- Use descriptive field names (camelCase)
- Include description for every field
- Use appropriate types: string, number, integer, boolean, object, array
- Mark required fields with `required: [...]`
- Use enums for fixed sets of values
- Reference schemas with `$ref: '#/components/schemas/...'`

### Response Examples
```yaml
responses:
  '200':
    description: Success
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/SuccessResponse'
        examples:
          success:
            $ref: '#/components/examples/SuccessExample'
```

### Error Handling
Define error schemas:
```yaml
Error:
  type: object
  properties:
    code:
      type: string
    message:
      type: string
    details:
      type: object
```

### File Structure
```
/
├── openapi.yaml        # Main API specification
├── index.html          # Redoc entry point
├── .redocly.yaml       # Redoc configuration
├── .github/workflows/  # GitHub Actions
├── dist/               # Built documentation
└── README.md
```

### GitHub Pages Deployment
- Push to main branch triggers auto-deploy
- Workflow: `.github/workflows/deploy.yml`
- Docs served from `/` root

### Naming Conventions
- Endpoints: kebab-case `/payment-cancel`
- Tags: PascalCase (Payments, Refunds)
- Schema: PascalCase (PaymentRequest)
- Fields: camelCase (customerId, createdAt)
