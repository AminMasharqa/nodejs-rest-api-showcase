# 🚀 Node.js REST API Showcase

[![GitHub stars](https://img.shields.io/github/stars/AminMasharqa/nodejs-rest-api-showcase?style=social)](https://github.com/AminMasharqa/nodejs-rest-api-showcase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Test Coverage](https://img.shields.io/badge/coverage-79.48%25-brightgreen)](./coverage/lcov-report/index.html)
[![Tests](https://img.shields.io/badge/tests-20%20passing-brightgreen)](./tests/)

> **Enterprise-grade REST API built with Node.js, Express, and Docker. Features complete CRUD operations, comprehensive testing (79.48% coverage), input validation, error handling, and production-ready containerization.**

## 🎯 **Live Demo**

🌐 **API Base URL**: `http://localhost:3000/api/users`  
🏥 **Health Check**: `http://localhost:3000/health`  
📖 **Coverage Report**: `./coverage/lcov-report/index.html` (after running tests)

## ✨ **Key Features**

### 🏗️ **Production-Ready REST API**
- **Complete CRUD Operations** - Create, Read, Update, Delete with proper HTTP methods
- **Input Validation & Sanitization** - Email format validation, required fields, data trimming
- **Professional Error Handling** - Comprehensive error responses with meaningful messages
- **Data Integrity** - Duplicate email prevention, referential integrity checks
- **RESTful Design** - Standard HTTP status codes and JSON response format

### 🐳 **Enterprise Docker Architecture**
- **Multi-Environment Containers** - Separate Development, Testing, and Production setups
- **Multi-Stage Production Builds** - Optimized images with security hardening
- **Hot Reload Development** - Live code changes with volume mounting and nodemon
- **Health Monitoring** - Built-in health checks, auto-restart, and status monitoring
- **Container Orchestration** - Docker Compose for complex multi-container workflows

### 🧪 **Comprehensive Testing Suite**
- **79.48% Test Coverage** - High-quality test coverage with detailed reporting
- **20+ Test Cases** - Unit tests, integration tests, and edge case scenarios
- **Coverage Reporting** - HTML reports with line-by-line coverage analysis
- **Containerized Testing** - Isolated test environments with Docker
- **Quality Gates** - Coverage thresholds and automated quality enforcement

### 🛡️ **Security & Production Features**
- **Security Hardened** - Non-root containers, input sanitization, error boundaries
- **Performance Optimized** - Alpine Linux base, minimal dependencies, fast startup
- **Monitoring Ready** - Health endpoints, logging, container status checks
- **CI/CD Ready** - Automated testing, coverage reports, deployment workflows

## 🚀 **Quick Start**

### **Prerequisites**
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/) (for local development)

### **🐳 Docker Quick Start (Recommended)**

```bash
# Clone and setup
git clone https://github.com/AminMasharqa/nodejs-rest-api-showcase.git
cd nodejs-rest-api-showcase
chmod +x docker-scripts.sh

# Verify everything works
./docker-scripts.sh test

# Start development environment
./docker-scripts.sh dev
# 🎯 API available at http://localhost:3000

# Or start production environment
./docker-scripts.sh prod
```

### **📦 Local Development**

```bash
npm install                    # Install dependencies
npm test                       # Run tests
npm run test:coverage          # Generate coverage report
npm run dev                    # Start development server
npm start                      # Start production server
```

## 🐳 **Docker Architecture**

### **Container Strategy Overview**

| Environment | Dockerfile | Purpose | Features |
|-------------|------------|---------|----------|
| **Development** | `Dockerfile.dev` | Daily coding | Hot reload, debugging tools, full dependencies |
| **Testing** | `Dockerfile.test` | Quality assurance | Isolated environment, coverage reports, CI/CD ready |
| **Production** | `Dockerfile` | Live deployment | Multi-stage build, security hardened, optimized size |

### **🔧 Docker Management Commands**

| Command | Purpose | Environment | Output |
|---------|---------|-------------|--------|
| `./docker-scripts.sh dev` | Start development server | Development | Hot reload at :3000 |
| `./docker-scripts.sh test` | Run full test suite | Testing | 20 tests, pass/fail results |
| `./docker-scripts.sh test-coverage` | Generate coverage report | Testing | 79.48% coverage, HTML reports |
| `./docker-scripts.sh test-watch` | TDD development mode | Testing | Live test running |
| `./docker-scripts.sh prod` | Start production server | Production | Optimized container at :3000 |
| `./docker-scripts.sh build` | Build production image | Build | Optimized Docker image |
| `./docker-scripts.sh logs` | View application logs | Monitoring | Real-time log output |
| `./docker-scripts.sh health` | Check application status | Monitoring | Health and container status |
| `./docker-scripts.sh stop` | Stop all containers | Management | Clean shutdown |
| `./docker-scripts.sh clean` | Clean Docker resources | Maintenance | Remove containers/images |

### **🏗️ Multi-Stage Production Build**

```dockerfile
# Stage 1: Builder - Install all dependencies
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production - Optimized runtime
FROM node:18-alpine AS production
RUN apk add --no-cache dumb-init
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
RUN rm -rf tests/ *.test.js coverage/ .git/  # Security cleanup
USER nodejs  # Non-root security
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health')"
CMD ["node", "server.js"]
```

## 📋 **Complete API Documentation**

### **Base URL**: `http://localhost:3000`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/users` | Get all users | None | `{success, count, data[]}` |
| GET | `/api/users/:id` | Get user by ID | None | `{success, data{}}` |
| POST | `/api/users` | Create new user | `{name, email, age}` | `{success, message, data{}}` |
| PUT | `/api/users/:id` | Update user (complete) | `{name, email, age}` | `{success, message, data{}}` |
| PATCH | `/api/users/:id` | Update user (partial) | `{name?, email?, age?}` | `{success, message, data{}}` |
| DELETE | `/api/users/:id` | Delete user | None | `{success, message}` |
| GET | `/health` | Application health check | None | `{success, message, timestamp}` |

### **📝 API Examples**

#### **Create User**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

#### **Get All Users**
```bash
curl http://localhost:3000/api/users
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "age": 25
    }
  ]
}
```

#### **Update User (Partial)**
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age": 31}'
```

#### **Delete User**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

#### **Health Check**
```bash
curl http://localhost:3000/health
```

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-06-11T17:53:48.049Z"
}
```

### **🚨 Error Response Examples**

#### **Validation Error (400)**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Valid email is required",
    "Age must be a positive number"
  ]
}
```

#### **Duplicate Email (409)**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

#### **User Not Found (404)**
```json
{
  "success": false,
  "message": "User not found"
}
```

#### **Malformed JSON (400)**
```json
{
  "success": false,
  "message": "Invalid JSON format"
}
```

## 🧪 **Testing & Quality Assurance**

### **Test Coverage: 79.48%**

| Metric | Coverage | Quality |
|--------|----------|---------|
| **Statements** | 79.48% | ✅ Excellent |
| **Branches** | 68.49% | ✅ Good |
| **Functions** | 83.33% | ✅ Excellent |
| **Lines** | 80.55% | ✅ Excellent |

### **🧪 Test Categories (20 Test Cases)**

#### **CRUD Operations Testing**
- ✅ GET all users with proper response format
- ✅ GET user by ID with valid/invalid IDs
- ✅ POST user creation with validation
- ✅ PUT complete user updates
- ✅ PATCH partial user updates
- ✅ DELETE user with proper cleanup

#### **Validation & Error Testing**
- ✅ Input validation (name, email, age requirements)
- ✅ Duplicate email prevention
- ✅ Malformed JSON handling
- ✅ Missing field validation
- ✅ Data sanitization (whitespace trimming)

#### **Integration & Edge Cases**
- ✅ Complete CRUD workflow testing
- ✅ Non-existent route handling (404)
- ✅ Health endpoint functionality
- ✅ Error boundary testing
- ✅ Data persistence across operations

### **🚀 Running Tests**

```bash
# Quick test run
npm test                                  # 20 tests, ~1 second
./docker-scripts.sh test                 # Containerized testing

# Coverage analysis
npm run test:coverage                     # Local coverage report
./docker-scripts.sh test-coverage        # Docker coverage report

# Development testing
npm run test:watch                        # TDD watch mode
./docker-scripts.sh test-watch          # Docker TDD mode
```

### **📊 Coverage Reports**

After running coverage tests, view detailed reports:

```bash
# Open HTML coverage report
open coverage/lcov-report/index.html     # macOS
start coverage/lcov-report/index.html    # Windows
xdg-open coverage/lcov-report/index.html # Linux
```

The coverage report shows:
- **Line-by-line coverage** analysis
- **Uncovered code paths** highlighted
- **Branch coverage** details
- **Function coverage** metrics

## 🏗️ **Project Architecture**

### **📁 Project Structure**
```
nodejs-rest-api-showcase/
├── 📄 server.js                        # Main application server (217 lines)
├── 📦 package.json                     # Dependencies, scripts, Jest config
├── 🧪 tests/
│   └── api.test.js                     # Comprehensive test suite (20 tests)
├── 🐳 docker/
│   ├── Dockerfile                      # Production multi-stage build
│   ├── Dockerfile.dev                  # Development with hot reload
│   └── Dockerfile.test                 # Testing environment
├── 🔧 docker-compose.yml               # Container orchestration
├── 🔧 docker-scripts.sh                # Docker management utilities
├── 📝 README.md                       # This comprehensive documentation
├── 📊 coverage/                        # Test coverage reports (generated)
│   ├── lcov-report/index.html          # Visual coverage report
│   ├── lcov.info                       # Coverage data
│   └── coverage-final.json             # JSON coverage export
├── 🚫 .dockerignore                   # Docker build exclusions
├── 🚫 .gitignore                      # Git tracking exclusions
└── 📋 package-lock.json               # Dependency lock file
```

### **🏛️ Application Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 HTTP Requests                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 📡 Express Router                           │
│  ├── CORS Middleware                                        │
│  ├── JSON Body Parser                                       │
│  └── Error Handling                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                🔀 Route Handlers                            │
│  ├── GET    /api/users          (List all users)           │
│  ├── GET    /api/users/:id      (Get single user)          │
│  ├── POST   /api/users          (Create user)              │
│  ├── PUT    /api/users/:id      (Update user - full)       │
│  ├── PATCH  /api/users/:id      (Update user - partial)    │
│  ├── DELETE /api/users/:id      (Delete user)              │
│  └── GET    /health             (Health check)             │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                🛡️ Validation Layer                          │
│  ├── Input Sanitization                                     │
│  ├── Email Format Validation                                │
│  ├── Required Field Checks                                  │
│  └── Data Type Validation                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                💾 Data Layer                                │
│  ├── In-Memory Storage (users array)                        │
│  ├── Unique ID Generation                                   │
│  ├── Duplicate Prevention                                   │
│  └── Data Persistence (session-based)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                📤 JSON Response                             │
│  ├── Success: {success: true, data: {...}}                 │
│  ├── Error: {success: false, message: "..."}               │
│  └── Consistent HTTP Status Codes                           │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ **Technology Stack**

### **Backend & Runtime**
- **Node.js 18+** - JavaScript runtime with modern ES features
- **Express.js 4.18+** - Fast, minimalist web framework
- **CORS** - Cross-origin resource sharing middleware

### **Testing & Quality**
- **Jest 29.7+** - JavaScript testing framework with coverage
- **Supertest 6.3+** - HTTP assertion library for API testing
- **Coverage Reporting** - HTML, LCOV, and JSON formats

### **DevOps & Containerization**
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **Alpine Linux** - Lightweight, security-oriented base image
- **Multi-stage Builds** - Production optimization

### **Development Tools**
- **Nodemon** - Development auto-restart utility
- **npm Scripts** - Task automation and workflow management
- **ESLint Ready** - Code quality and style enforcement

## 🔧 **Advanced Configuration**

### **Environment Variables**

```bash
# Development
NODE_ENV=development
PORT=3000
DEBUG=app:*

# Production
NODE_ENV=production
PORT=3000
LOG_LEVEL=info

# Testing
NODE_ENV=test
PORT=3001
SILENT_LOGS=true
```

### **Docker Compose Profiles**

```yaml
# Development stack
docker-compose --profile dev up

# Testing stack  
docker-compose --profile test up

# Production stack
docker-compose --profile prod up

# Full stack (all environments)
docker-compose --profile dev --profile test --profile prod up
```

### **Custom Docker Commands**

```bash
# Build specific environments
docker build -f Dockerfile.dev -t my-api:dev .
docker build -f Dockerfile.test -t my-api:test .
docker build -f Dockerfile -t my-api:prod .

# Run with custom configuration
docker run -e NODE_ENV=production -p 3000:3000 my-api:prod

# Development with volume mounting
docker run -v $(pwd):/app -p 3000:3000 my-api:dev

# Interactive container access
docker exec -it container_name sh
```

### **Health Monitoring & Debugging**

```bash
# Container health status
docker inspect container_name --format='{{.State.Health.Status}}'

# Resource monitoring
docker stats --no-stream container_name

# Live log following
docker logs container_name -f --tail 100

# Container process information
docker exec container_name ps aux
```

## 🚀 **Production Deployment**

### **Build Production Image**
```bash
# Build optimized production image
./docker-scripts.sh build

# Tag for registry
docker tag nodejs-rest-api-showcase:latest your-registry/api:v1.0.0
```

### **Cloud Platform Deployment**

#### **🚀 Heroku**
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku container:push web
heroku container:release web
heroku open
```

#### **☁️ Railway**
```bash
# Connect GitHub repository
# Railway auto-deploys from Dockerfile
railway login
railway link
railway up
```

#### **🔶 AWS ECS/Fargate**
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
docker build -t your-registry/api:latest .
docker tag your-registry/api:latest your-account.dkr.ecr.us-east-1.amazonaws.com/your-registry/api:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/your-registry/api:latest
```

#### **🐙 DigitalOcean App Platform**
```yaml
# app.yaml
name: nodejs-rest-api
services:
- name: api
  source_dir: /
  github:
    repo: AminMasharqa/nodejs-rest-api-showcase
    branch: main
  dockerfile_path: Dockerfile
  ports:
  - port: 3000
    http_port: 80
```

### **Production Checklist**
- ✅ Environment variables configured
- ✅ Health checks enabled (`/health` endpoint)
- ✅ Resource limits defined
- ✅ Logging configured (structured JSON logs)
- ✅ Monitoring setup (uptime, performance)
- ✅ SSL/TLS termination
- ✅ Load balancing configured
- ✅ Backup and recovery strategy

## 🔍 **Monitoring & Observability**

### **Application Health**
```bash
# Health endpoint check
curl http://localhost:3000/health

# Expected response
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-06-11T17:53:48.049Z"
}
```

### **Container Monitoring**
```bash
# Container health status
./docker-scripts.sh health

# Resource usage
docker stats --no-stream

# Application logs
./docker-scripts.sh logs
```

### **Performance Metrics**
```bash
# Response time testing
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/api/users

# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:3000/api/users

# Memory usage monitoring
docker exec container_name cat /proc/meminfo
```

## 🎯 **API Design Principles**

### **RESTful Design Standards**
- **Resource-based URLs** - `/api/users/:id`
- **Standard HTTP Methods** - GET, POST, PUT, PATCH, DELETE
- **Proper Status Codes** - 200, 201, 400, 404, 409, 500
- **Consistent JSON Format** - Always include `success` flag
- **Descriptive Error Messages** - Clear, actionable feedback

### **Input Validation Strategy**
```javascript
// Validation rules implemented:
{
  name: "required, string, 1-100 characters, trimmed",
  email: "required, valid email format, unique, trimmed", 
  age: "required, positive integer, 1-150 range"
}
```

### **Error Handling Philosophy**
- **Graceful Degradation** - Never crash the application
- **Meaningful Feedback** - Clear error descriptions for developers
- **Consistent Format** - Standard error response structure
- **Security Conscious** - No sensitive information in error messages
- **HTTP Compliance** - Proper status codes for different error types

### **Response Format Standards**
```javascript
// Success responses
{
  success: true,
  [message]: "Operation completed successfully",
  [data]: {...},
  [count]: 42
}

// Error responses
{
  success: false,
  message: "Error description",
  [errors]: ["Detailed error 1", "Detailed error 2"]
}
```

## 🎓 **Learning Outcomes & Skills Demonstrated**

### **Backend Development Excellence**
- ✅ **RESTful API Design** - Industry-standard REST principles
- ✅ **HTTP Protocol Mastery** - Proper status codes and methods
- ✅ **JSON API Standards** - Consistent, well-structured responses
- ✅ **Error Handling Strategies** - Comprehensive error management
- ✅ **Input Validation** - Security-focused data validation
- ✅ **Middleware Architecture** - Express.js middleware patterns

### **Testing & Quality Assurance**
- ✅ **Unit Testing** - Individual component testing with Jest
- ✅ **Integration Testing** - End-to-end workflow validation
- ✅ **Test-Driven Development** - TDD approach with comprehensive coverage
- ✅ **Coverage Analysis** - 79.48% coverage with detailed reporting
- ✅ **Edge Case Testing** - Boundary conditions and error scenarios
- ✅ **Performance Testing** - Response time and load validation

### **DevOps & Infrastructure**
- ✅ **Docker Containerization** - Multi-environment container strategy
- ✅ **Multi-Stage Builds** - Production-optimized Docker images
- ✅ **Container Orchestration** - Docker Compose workflow management
- ✅ **Environment Management** - Dev/test/prod environment separation
- ✅ **Health Monitoring** - Application health checks and monitoring
- ✅ **Security Hardening** - Non-root containers and secure practices

### **Professional Development Practices**
- ✅ **Clean Code Architecture** - Readable, maintainable code structure
- ✅ **Documentation Excellence** - Comprehensive README and API docs
- ✅ **Version Control** - Professional Git workflow and commit messages
- ✅ **Project Organization** - Logical file structure and naming conventions
- ✅ **Automation** - Scripted workflows and task automation

## 🤝 **Contributing**

Contributions are welcome! This project follows standard open-source contribution practices.

### **Development Workflow**
```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-new-feature

# 3. Make your changes
# 4. Run tests to ensure quality
./docker-scripts.sh test-coverage

# 5. Commit with descriptive messages
git commit -m "feat: add amazing new feature

- Implement new functionality
- Add comprehensive tests
- Update documentation"

# 6. Push and create pull request
git push origin feature/amazing-new-feature
```

### **Contribution Guidelines**
- **Tests Required** - All new features must include tests
- **Coverage Maintained** - Maintain or improve coverage percentage
- **Documentation Updated** - Update README for new features
- **Code Style** - Follow existing code style and patterns
- **Commit Messages** - Use conventional commit format

### **Bug Reports & Feature Requests**
- Use GitHub Issues for bug reports
- Include reproduction steps for bugs
- Provide clear descriptions for feature requests
- Check existing issues before creating new ones

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Free for commercial and personal use
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
```

## 👨‍💻 **Author**

**Amin Masharqa**
- 🐙 **GitHub**: [@AminMasharqa](https://github.com/AminMasharqa)
- 💼 **LinkedIn**: [Connect with me](https://www.linkedin.com/in/aminmasharqa)
- 📧 **Email**: [Contact for opportunities](mailto:your-email@example.com)

### **About This Project**
This REST API showcase was built to demonstrate modern backend development skills, Docker containerization expertise, and professional software engineering practices. It represents the kind of production-ready code that powers enterprise applications.

## 🙏 **Acknowledgments**

- **Express.js Team** - For the excellent and flexible web framework
- **Jest Team** - For the comprehensive and developer-friendly testing framework  
- **Docker Team** - For revolutionizing application containerization and deployment
- **Node.js Community** - For continuous innovation in JavaScript ecosystem
- **Open Source Contributors** - For building the tools that make modern development possible

## 🎯 **What's Next?**

This project serves as a foundation for more advanced features:

### **Potential Enhancements**
- 🗄️ **Database Integration** - PostgreSQL, MongoDB, or MySQL
- 🔐 **Authentication & Authorization** - JWT, OAuth, role-based access
- 📧 **Email Integration** - User notifications and confirmations
- 📊 **Advanced Logging** - Structured logging with Winston or Pino
- 🚀 **Caching Layer** - Redis integration for improved performance
- 📈 **Rate Limiting** - API rate limiting and abuse prevention
- 🔍 **Search & Filtering** - Advanced query capabilities
- 🌐 **API Versioning** - Support for multiple API versions
- 📱 **Real-time Features** - WebSocket integration for live updates

### **Infrastructure Improvements**
- ☸️ **Kubernetes Deployment** - Container orchestration at scale
- 🔄 **CI/CD Pipeline** - GitHub Actions, Jenkins, or GitLab CI
- 📊 **Monitoring Stack** - Prometheus, Grafana, ELK stack
- 🛡️ **Security Scanning** - Automated vulnerability scanning
- 🌍 **CDN Integration** - Global content delivery
- 📈 **Auto-scaling** - Dynamic resource scaling based on load

---

## 🏆 **Project Highlights**

### **📊 Key Metrics**
- **79.48% Test Coverage** with 20 comprehensive test cases
- **3 Docker Environments** (development, testing, production)
- **217 Lines** of clean, well-documented server code
- **7 RESTful Endpoints** with full CRUD functionality
- **Sub-second Test Execution** (1.079s for full suite)
- **Enterprise-grade Architecture** ready for production scaling

### **🎯 Perfect For**
- **Portfolio Projects** - Showcasing backend development skills
- **Technical Interviews** - Demonstrating API design knowledge
- **Learning Resource** - Understanding modern Node.js practices
- **Startup MVP** - Foundation for rapid application development
- **Enterprise Reference** - Best practices for team development

---

⭐ **If this project demonstrates the kind of code quality you're looking for, please star the repository!**

🚀 **Ready to build production-grade APIs? Fork this repository and start building the future!**

---

*Built with ❤️ and lots of ☕ by developers who believe in writing code that matters.*