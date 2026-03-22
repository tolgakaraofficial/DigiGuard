# DigiGuard API Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL & Versioning](#base-url--versioning)
4. [Common Headers](#common-headers)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [API Endpoints](#api-endpoints)
8. [Webhooks](#webhooks)
9. [SDKs & Tools](#sdks--tools)
10. [Changelog](#changelog)

**Related Documentation:**
- [Main README](../README.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Security Architecture](./SECURITY_ARCHITECTURE.md)
- [OpenAPI Specification](./OPENAPI_SPEC.yaml)

## 🌟 Overview

The DigiGuard API provides secure digital identity verification and protection services. It offers endpoints for user authentication, biometric verification, AI-powered deepfake detection, and blockchain-based certificate management.

### Key Features
- Multi-factor authentication
- Biometric verification (face, voice)
- AI-powered fake content detection
- Blockchain certificate generation
- Real-time security monitoring

### API Characteristics
- **Protocol**: HTTPS only
- **Data Format**: JSON
- **Authentication**: JWT Bearer tokens
- **Rate Limiting**: Yes (see details below)
- **Versioning**: URL-based versioning

## 🔐 Authentication

### Authentication Methods

#### 1. JWT Bearer Token
Most endpoints require a valid JWT token in the Authorization header.

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 2. API Key (for server-to-server)
Some endpoints support API key authentication for server-to-server communication.

```http
X-API-Key: dg_live_1234567890abcdef
```

### Token Lifecycle
- **Access Token**: 15 minutes validity
- **Refresh Token**: 7 days validity
- **API Key**: No expiration (can be revoked)

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Service
    
    Client->>API: POST /auth/login
    API->>Auth Service: Validate credentials
    Auth Service-->>API: User validated
    API-->>Client: Access + Refresh tokens
    
    Client->>API: GET /user/profile (with token)
    API->>Auth Service: Validate token
    Auth Service-->>API: Token valid
    API-->>Client: Profile data
```

## 🌐 Base URL & Versioning

### Base URLs
- **Production**: `https://api.digiguard.com`
- **Staging**: `https://api-staging.digiguard.com`
- **Development**: `https://api-dev.digiguard.com`

### Versioning
Current version: **v1**

All endpoints are prefixed with the version:
```
https://api.digiguard.com/v1/endpoint
```

### Version Support Policy
- **Current version (v1)**: Full support
- **Previous version**: 6 months deprecation notice
- **Legacy versions**: Security updates only

## 📤 Common Headers

### Request Headers
```http
Content-Type: application/json
Authorization: Bearer {token}
X-Client-Version: 1.0.0
X-Request-ID: uuid-v4
Accept: application/json
User-Agent: DigiGuard-Client/1.0.0
```

### Response Headers
```http
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-Request-ID: uuid-v4
X-Response-Time: 150ms
```

## ⚠️ Error Handling

### Error Response Format
All errors follow a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "request_id": "req_1234567890",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### HTTP Status Codes

| Status Code | Description | Usage |
|-------------|-------------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 502 | Bad Gateway | Upstream service error |
| 503 | Service Unavailable | Service temporarily unavailable |

### Error Codes

| Error Code | Description |
|------------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTHENTICATION_FAILED` | Invalid credentials |
| `AUTHORIZATION_FAILED` | Insufficient permissions |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `RESOURCE_CONFLICT` | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `BIOMETRIC_VERIFICATION_FAILED` | Biometric verification failed |
| `AI_ANALYSIS_FAILED` | AI analysis could not be completed |
| `BLOCKCHAIN_ERROR` | Blockchain operation failed |
| `INTERNAL_ERROR` | Internal server error |

## 🚦 Rate Limiting

### Rate Limits by Endpoint Type

| Endpoint Type | Rate Limit | Window |
|---------------|------------|--------|
| Authentication | 5 requests | 1 minute |
| User Management | 100 requests | 1 hour |
| Media Upload | 10 requests | 1 minute |
| AI Analysis | 20 requests | 1 hour |
| Certificate Generation | 5 requests | 1 hour |
| General API | 1000 requests | 1 hour |

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 3600
```

### Rate Limit Exceeded Response
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds.",
    "retry_after": 3600,
    "request_id": "req_1234567890"
  }
}
```

## 🔗 API Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request:**
```http
POST /v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "+1234567890",
  "password": "SecurePassword123!",
  "terms_accepted": true
}
```

**Response (201):**
```json
{
  "data": {
    "user_id": "usr_1234567890",
    "email": "user@example.com",
    "phone": "+1234567890",
    "status": "pending_verification",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "meta": {
    "verification_required": true,
    "verification_methods": ["email", "sms"]
  }
}
```

**Errors:**
- `400` - Invalid input parameters
- `409` - User already exists

---

#### POST /auth/verify
Verify user account with OTP codes.

**Request:**
```http
POST /v1/auth/verify
Content-Type: application/json

{
  "user_id": "usr_1234567890",
  "email_code": "123456",
  "sms_code": "654321"
}
```

**Response (200):**
```json
{
  "data": {
    "user_id": "usr_1234567890",
    "status": "verified",
    "verified_at": "2024-01-15T10:35:00Z"
  }
}
```

---

#### POST /auth/login
Authenticate user and get access tokens.

**Request:**
```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 900,
    "user": {
      "id": "usr_1234567890",
      "email": "user@example.com",
      "status": "active",
      "security_level": "high"
    }
  }
}
```

---

#### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```http
POST /v1/auth/refresh
Content-Type: application/json
Authorization: Bearer {refresh_token}

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 900
  }
}
```

---

#### POST /auth/logout
Logout user and invalidate tokens.

**Request:**
```http
POST /v1/auth/logout
Authorization: Bearer {access_token}
```

**Response (204):**
```
No content
```

### User Management Endpoints

#### GET /user/profile
Get current user profile.

**Request:**
```http
GET /v1/user/profile
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "data": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "phone": "+1234567890",
    "personal_info": {
      "first_name": "John",
      "last_name": "Doe",
      "birth_date": "1990-01-01",
      "nationality": "US"
    },
    "identity_info": {
      "id_type": "passport",
      "id_number": "****1234",
      "verified": true
    },
    "security": {
      "level": "high",
      "biometric_enabled": true,
      "last_verification": "2024-01-15T09:00:00Z"
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

#### PUT /user/profile
Update user profile information.

**Request:**
```http
PUT /v1/user/profile
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "personal_info": {
    "first_name": "John",
    "last_name": "Smith",
    "address": "123 Main St, City, State 12345"
  }
}
```

**Response (200):**
```json
{
  "data": {
    "id": "usr_1234567890",
    "personal_info": {
      "first_name": "John",
      "last_name": "Smith",
      "address": "123 Main St, City, State 12345"
    },
    "updated_at": "2024-01-15T10:35:00Z"
  }
}
```

### Biometric Endpoints

#### POST /biometric/enroll
Enroll biometric data for user.

**Request:**
```http
POST /v1/biometric/enroll
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

face_image: [binary data]
voice_sample: [binary data]
biometric_type: "face_voice"
```

**Response (201):**
```json
{
  "data": {
    "enrollment_id": "bio_1234567890",
    "biometric_type": "face_voice",
    "quality_score": 0.95,
    "enrolled_at": "2024-01-15T10:30:00Z",
    "status": "active"
  }
}
```

---

#### POST /biometric/verify
Verify user identity using biometric data.

**Request:**
```http
POST /v1/biometric/verify
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

face_image: [binary data]
voice_sample: [binary data]
challenge_response: "user_spoke_phrase"
```

**Response (200):**
```json
{
  "data": {
    "verification_id": "ver_1234567890",
    "result": "verified",
    "confidence_score": 0.98,
    "liveness_detected": true,
    "biometric_match": true,
    "verified_at": "2024-01-15T10:30:00Z"
  }
}
```

### Media Analysis Endpoints

#### POST /media/upload
Upload media files for analysis.

**Request:**
```http
POST /v1/media/upload
Authorization: Bearer {access_token}
Content-Type: multipart/form-data

files: [binary data array]
analysis_type: "deepfake_detection"
priority: "normal"
```

**Response (201):**
```json
{
  "data": {
    "upload_id": "upl_1234567890",
    "files": [
      {
        "file_id": "file_1234567890",
        "filename": "video.mp4",
        "size": 1048576,
        "type": "video/mp4",
        "status": "uploaded"
      }
    ],
    "analysis_queued": true,
    "estimated_completion": "2024-01-15T10:35:00Z"
  }
}
```

---

#### GET /media/analysis/{analysis_id}
Get analysis results for uploaded media.

**Request:**
```http
GET /v1/media/analysis/ana_1234567890
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "data": {
    "analysis_id": "ana_1234567890",
    "upload_id": "upl_1234567890",
    "status": "completed",
    "results": {
      "authenticity_score": 0.92,
      "is_authentic": true,
      "confidence": "high",
      "analysis_details": {
        "face_analysis": {
          "deepfake_probability": 0.05,
          "facial_inconsistencies": []
        },
        "voice_analysis": {
          "synthetic_probability": 0.03,
          "voice_cloning_detected": false
        },
        "metadata_analysis": {
          "tampering_detected": false,
          "creation_timestamp": "2024-01-15T09:00:00Z"
        }
      }
    },
    "processed_at": "2024-01-15T10:32:00Z"
  }
}
```

### Certificate Endpoints

#### POST /certificates/generate
Generate digital identity certificate.

**Request:**
```http
POST /v1/certificates/generate
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "certificate_type": "identity_verification",
  "validity_period": "1_year",
  "include_biometric_hash": true
}
```

**Response (201):**
```json
{
  "data": {
    "certificate_id": "cert_1234567890",
    "certificate_data": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
    "blockchain_hash": "0x1234567890abcdef...",
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "issued_at": "2024-01-15T10:30:00Z",
    "expires_at": "2025-01-15T10:30:00Z",
    "status": "active"
  }
}
```

---

#### GET /certificates/{certificate_id}/verify
Verify certificate authenticity.

**Request:**
```http
GET /v1/certificates/cert_1234567890/verify
```

**Response (200):**
```json
{
  "data": {
    "certificate_id": "cert_1234567890",
    "is_valid": true,
    "issued_to": "John Doe",
    "issued_by": "DigiGuard CA",
    "issued_at": "2024-01-15T10:30:00Z",
    "expires_at": "2025-01-15T10:30:00Z",
    "blockchain_verified": true,
    "revocation_status": "not_revoked"
  }
}
```

### Security Monitoring Endpoints

#### GET /security/alerts
Get security alerts for user.

**Request:**
```http
GET /v1/security/alerts?limit=10&offset=0
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "data": [
    {
      "alert_id": "alert_1234567890",
      "type": "suspicious_login",
      "severity": "medium",
      "message": "Login from new device detected",
      "details": {
        "ip_address": "192.168.1.100",
        "location": "New York, US",
        "device": "Chrome on Windows"
      },
      "created_at": "2024-01-15T10:25:00Z",
      "status": "active"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "offset": 0,
    "has_more": false
  }
}
```

---

#### POST /security/report-incident
Report security incident.

**Request:**
```http
POST /v1/security/report-incident
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "incident_type": "identity_theft",
  "description": "Suspicious activity detected on my account",
  "evidence_urls": ["https://example.com/evidence.jpg"],
  "severity": "high"
}
```

**Response (201):**
```json
{
  "data": {
    "incident_id": "inc_1234567890",
    "status": "reported",
    "ticket_number": "DG-2024-001234",
    "estimated_response_time": "24_hours",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## 🔗 Webhooks

### Webhook Events

DigiGuard can send webhook notifications for various events:

| Event Type | Description |
|------------|-------------|
| `user.verified` | User account verified |
| `biometric.enrolled` | Biometric data enrolled |
| `analysis.completed` | Media analysis completed |
| `certificate.issued` | Certificate generated |
| `security.alert` | Security alert triggered |
| `incident.resolved` | Security incident resolved |

### Webhook Payload Format

```json
{
  "event": "analysis.completed",
  "data": {
    "analysis_id": "ana_1234567890",
    "user_id": "usr_1234567890",
    "results": {
      "authenticity_score": 0.92,
      "is_authentic": true
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "webhook_id": "wh_1234567890"
}
```

### Webhook Security

All webhooks are signed with HMAC-SHA256:

```http
X-DigiGuard-Signature: sha256=1234567890abcdef...
X-DigiGuard-Timestamp: 1640995200
```

### Webhook Configuration

```http
POST /v1/webhooks
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/digiguard",
  "events": ["analysis.completed", "security.alert"],
  "secret": "your_webhook_secret"
}
```

## 🛠️ SDKs & Tools

### Official SDKs

#### JavaScript/TypeScript SDK
```bash
npm install @digiguard/sdk
```

```javascript
import { DigiGuard } from '@digiguard/sdk';

const client = new DigiGuard({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Upload and analyze media
const analysis = await client.media.analyze({
  file: fileBuffer,
  type: 'deepfake_detection'
});
```

#### Python SDK
```bash
pip install digiguard-python
```

```python
from digiguard import DigiGuard

client = DigiGuard(api_key='your_api_key')

# Generate certificate
certificate = client.certificates.generate(
    certificate_type='identity_verification'
)
```

### API Testing Tools

#### Postman Collection
Import our Postman collection for easy API testing:
```
https://api.digiguard.com/postman/collection.json
```

#### OpenAPI Specification
Download OpenAPI 3.0 specification:
```
https://api.digiguard.com/openapi.json
```

### Automatic Documentation Tools

#### Recommended Tools

1. **Swagger/OpenAPI Generator**
   ```bash
   npm install -g @openapitools/openapi-generator-cli
   openapi-generator-cli generate -i openapi.json -g html2 -o docs/
   ```

2. **Redoc**
   ```bash
   npm install -g redoc-cli
   redoc-cli build openapi.json --output docs/index.html
   ```

3. **Insomnia Designer**
   - Import OpenAPI spec
   - Generate documentation
   - Test endpoints interactively

4. **Stoplight Studio**
   - Visual API design
   - Automatic documentation
   - Mock servers

#### Documentation Generation Workflow

```yaml
# .github/workflows/docs.yml
name: Generate API Documentation
on:
  push:
    branches: [main]
jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate OpenAPI spec
        run: npm run generate-openapi
      - name: Generate documentation
        run: redoc-cli build openapi.json --output docs/index.html
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

## 📝 Changelog

### Version 1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- User management
- Biometric verification
- Media analysis
- Certificate generation
- Security monitoring

### Upcoming Features (v1.1.0)
- Batch processing endpoints
- Advanced analytics
- Multi-language support
- Enhanced webhook events
- GraphQL API support

## 📞 Support

### API Support
- **Email**: api-support@digiguard.com
- **Documentation**: https://docs.digiguard.com
- **Status Page**: https://status.digiguard.com
- **Community**: https://community.digiguard.com

### Rate Limit Increases
Contact support for higher rate limits with:
- Use case description
- Expected traffic volume
- Business justification

### SLA & Uptime
- **Uptime Target**: 99.9%
- **Response Time**: < 200ms (95th percentile)
- **Support Response**: < 24 hours

---

*This documentation is automatically generated and updated. Last updated: 2024-01-15*