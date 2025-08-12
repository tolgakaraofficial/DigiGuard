# API Documentation Tools Setup Guide

## 🛠️ Automatic Documentation Generation Tools

This guide covers setting up various tools for automatic API documentation generation for the DigiGuard API.

## 📋 Table of Contents
1. [OpenAPI/Swagger Tools](#openapi-swagger-tools)
2. [Documentation Generators](#documentation-generators)
3. [Testing Tools](#testing-tools)
4. [CI/CD Integration](#ci-cd-integration)
5. [Monitoring & Analytics](#monitoring--analytics)

## 🔧 OpenAPI/Swagger Tools

### 1. Swagger UI
Generate interactive API documentation from OpenAPI spec.

#### Installation
```bash
npm install -g swagger-ui-dist
```

#### Usage
```bash
# Serve Swagger UI with your OpenAPI spec
swagger-ui-serve docs/OPENAPI_SPEC.yaml
```

#### Docker Setup
```dockerfile
FROM swaggerapi/swagger-ui
COPY docs/OPENAPI_SPEC.yaml /usr/share/nginx/html/openapi.yaml
ENV SWAGGER_JSON=/usr/share/nginx/html/openapi.yaml
```

### 2. Redoc
Beautiful, responsive API documentation.

#### Installation
```bash
npm install -g redoc-cli
```

#### Generate Static Documentation
```bash
redoc-cli build docs/OPENAPI_SPEC.yaml --output docs/api-docs.html
```

#### Serve Live Documentation
```bash
redoc-cli serve docs/OPENAPI_SPEC.yaml --watch
```

### 3. OpenAPI Generator
Generate client SDKs, server stubs, and documentation.

#### Installation
```bash
npm install -g @openapitools/openapi-generator-cli
```

#### Generate Documentation
```bash
# HTML documentation
openapi-generator-cli generate \
  -i docs/OPENAPI_SPEC.yaml \
  -g html2 \
  -o docs/generated/

# Markdown documentation
openapi-generator-cli generate \
  -i docs/OPENAPI_SPEC.yaml \
  -g markdown \
  -o docs/markdown/
```

#### Generate Client SDKs
```bash
# JavaScript/TypeScript SDK
openapi-generator-cli generate \
  -i docs/OPENAPI_SPEC.yaml \
  -g typescript-axios \
  -o sdks/typescript/

# Python SDK
openapi-generator-cli generate \
  -i docs/OPENAPI_SPEC.yaml \
  -g python \
  -o sdks/python/
```

## 📖 Documentation Generators

### 1. Stoplight Studio
Visual API design and documentation platform.

#### Setup
1. Install Stoplight Studio: https://stoplight.io/studio
2. Import OpenAPI spec: `docs/OPENAPI_SPEC.yaml`
3. Edit and enhance documentation visually
4. Publish to Stoplight Docs

#### Features
- Visual API designer
- Mock servers
- Automatic validation
- Collaborative editing

### 2. GitBook
Create beautiful documentation with GitBook.

#### Setup
```bash
npm install -g gitbook-cli
```

#### Initialize GitBook
```bash
gitbook init docs/
cd docs/
gitbook serve
```

#### Configuration (book.json)
```json
{
  "title": "DigiGuard API Documentation",
  "description": "Comprehensive API documentation for DigiGuard",
  "plugins": [
    "openapi",
    "swagger",
    "code-highlighter"
  ],
  "pluginsConfig": {
    "openapi": {
      "file": "OPENAPI_SPEC.yaml"
    }
  }
}
```

### 3. Docusaurus
Modern documentation platform by Facebook.

#### Setup
```bash
npx create-docusaurus@latest api-docs classic
cd api-docs
npm install @docusaurus/plugin-openapi-docs
```

#### Configuration (docusaurus.config.js)
```javascript
module.exports = {
  title: 'DigiGuard API',
  tagline: 'Secure Digital Identity API',
  url: 'https://docs.digiguard.com',
  baseUrl: '/',
  plugins: [
    [
      '@docusaurus/plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          digiguard: {
            specPath: 'docs/OPENAPI_SPEC.yaml',
            outputDir: 'docs/api',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
  ],
};
```

## 🧪 Testing Tools

### 1. Postman
API testing and documentation platform.

#### Collection Generation
```bash
# Generate Postman collection from OpenAPI spec
openapi-generator-cli generate \
  -i docs/OPENAPI_SPEC.yaml \
  -g postman-collection \
  -o postman/
```

#### Newman (CLI Runner)
```bash
npm install -g newman
newman run postman/DigiGuard-API.postman_collection.json \
  --environment postman/environment.json \
  --reporters html \
  --reporter-html-export reports/newman-report.html
```

### 2. Insomnia
REST API client with OpenAPI support.

#### Import OpenAPI Spec
1. Open Insomnia
2. Create new workspace
3. Import from file: `docs/OPENAPI_SPEC.yaml`
4. Generate requests automatically

### 3. HTTPie
Command-line HTTP client for API testing.

#### Installation
```bash
pip install httpie
```

#### Usage Examples
```bash
# Register user
http POST api.digiguard.com/v1/auth/register \
  email=user@example.com \
  phone=+1234567890 \
  password=SecurePassword123! \
  terms_accepted:=true

# Login
http POST api.digiguard.com/v1/auth/login \
  email=user@example.com \
  password=SecurePassword123!

# Get profile (with token)
http GET api.digiguard.com/v1/user/profile \
  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🔄 CI/CD Integration

### 1. GitHub Actions Workflow

#### .github/workflows/api-docs.yml
```yaml
name: Generate API Documentation

on:
  push:
    branches: [main]
    paths: ['docs/OPENAPI_SPEC.yaml']
  pull_request:
    paths: ['docs/OPENAPI_SPEC.yaml']

jobs:
  validate-spec:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate OpenAPI Spec
        uses: char0n/swagger-editor-validate@v1
        with:
          definition-file: docs/OPENAPI_SPEC.yaml

  generate-docs:
    needs: validate-spec
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          npm install -g redoc-cli
          npm install -g @openapitools/openapi-generator-cli
          
      - name: Generate Redoc documentation
        run: |
          redoc-cli build docs/OPENAPI_SPEC.yaml --output docs/api-docs.html
          
      - name: Generate SDK documentation
        run: |
          openapi-generator-cli generate \
            -i docs/OPENAPI_SPEC.yaml \
            -g html2 \
            -o docs/sdk-docs/
            
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
          
  generate-sdks:
    needs: validate-spec
    runs-on: ubuntu-latest
    strategy:
      matrix:
        language: [typescript-axios, python, java, go]
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate ${{ matrix.language }} SDK
        run: |
          openapi-generator-cli generate \
            -i docs/OPENAPI_SPEC.yaml \
            -g ${{ matrix.language }} \
            -o sdks/${{ matrix.language }}/
            
      - name: Upload SDK artifacts
        uses: actions/upload-artifact@v3
        with:
          name: sdk-${{ matrix.language }}
          path: sdks/${{ matrix.language }}/
```

### 2. GitLab CI Pipeline

#### .gitlab-ci.yml
```yaml
stages:
  - validate
  - generate
  - deploy

variables:
  OPENAPI_SPEC: "docs/OPENAPI_SPEC.yaml"

validate-spec:
  stage: validate
  image: node:18
  script:
    - npm install -g swagger-parser
    - swagger-parser validate $OPENAPI_SPEC
  only:
    changes:
      - docs/OPENAPI_SPEC.yaml

generate-docs:
  stage: generate
  image: node:18
  script:
    - npm install -g redoc-cli @openapitools/openapi-generator-cli
    - redoc-cli build $OPENAPI_SPEC --output public/index.html
    - openapi-generator-cli generate -i $OPENAPI_SPEC -g html2 -o public/sdk-docs/
  artifacts:
    paths:
      - public/
  only:
    - main

deploy-docs:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
    url: https://docs.digiguard.com
  only:
    - main
```

## 📊 Monitoring & Analytics

### 1. API Analytics with Mixpanel

#### Setup
```javascript
// Track API usage
const mixpanel = require('mixpanel').init('YOUR_TOKEN');

app.use('/v1', (req, res, next) => {
  mixpanel.track('API Request', {
    endpoint: req.path,
    method: req.method,
    user_id: req.user?.id,
    timestamp: new Date()
  });
  next();
});
```

### 2. Documentation Analytics with Google Analytics

#### Setup for Static Docs
```html
<!-- Add to generated HTML documentation -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. API Health Monitoring

#### Uptime Monitoring Script
```javascript
const axios = require('axios');
const cron = require('node-cron');

// Check API health every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await axios.get('https://api.digiguard.com/v1/health');
    console.log(`API Health: ${response.status} - ${response.data.status}`);
    
    // Log to monitoring service
    if (response.status !== 200) {
      // Send alert
      await sendAlert(`API health check failed: ${response.status}`);
    }
  } catch (error) {
    console.error('API health check failed:', error.message);
    await sendAlert(`API is down: ${error.message}`);
  }
});
```

## 🔧 Development Workflow

### 1. API-First Development

#### Workflow Steps
1. **Design API** in OpenAPI spec
2. **Generate mock server** for frontend development
3. **Generate client SDKs** for different languages
4. **Implement backend** following the spec
5. **Test against spec** for compliance
6. **Generate documentation** automatically

#### Mock Server Setup
```bash
# Using Prism
npm install -g @stoplight/prism-cli
prism mock docs/OPENAPI_SPEC.yaml --port 4010
```

### 2. Spec-Driven Testing

#### Contract Testing with Dredd
```bash
npm install -g dredd

# Test API against OpenAPI spec
dredd docs/OPENAPI_SPEC.yaml https://api.digiguard.com/v1 \
  --header "Authorization: Bearer YOUR_TOKEN"
```

### 3. Documentation Review Process

#### Pull Request Template
```markdown
## API Documentation Changes

### Changes Made
- [ ] Updated OpenAPI specification
- [ ] Added new endpoints
- [ ] Modified existing endpoints
- [ ] Updated examples
- [ ] Added error responses

### Checklist
- [ ] OpenAPI spec validates successfully
- [ ] Examples are accurate and tested
- [ ] Breaking changes are documented
- [ ] Changelog is updated
- [ ] SDKs need regeneration

### Testing
- [ ] Tested with Postman/Insomnia
- [ ] Contract tests pass
- [ ] Mock server works correctly
```

## 📚 Best Practices

### 1. OpenAPI Specification
- Use consistent naming conventions
- Provide comprehensive examples
- Document all error responses
- Include security requirements
- Version your API properly

### 2. Documentation Maintenance
- Keep documentation in sync with code
- Use automated validation in CI/CD
- Regular review and updates
- Collect feedback from developers

### 3. SDK Generation
- Test generated SDKs
- Provide usage examples
- Document SDK-specific features
- Version SDKs with API versions

### 4. Performance
- Optimize documentation loading
- Use CDN for static assets
- Implement search functionality
- Mobile-responsive design

This setup provides a comprehensive foundation for maintaining high-quality API documentation that stays synchronized with your codebase and provides excellent developer experience.