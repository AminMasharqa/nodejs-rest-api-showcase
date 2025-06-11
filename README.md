# 🚀 Node.js REST API Showcase

[![GitHub stars](https://img.shields.io/github/stars/AminMasharqa/nodejs-rest-api-showcase?style=social)](https://github.com/AminMasharqa/nodejs-rest-api-showcase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

> **Production-ready REST API built with Node.js, Express, Docker, and comprehensive testing. Features complete CRUD operations, input validation, error handling, and enterprise-grade containerization.**

## 🎯 **Live Demo**

- **Health Check**: `GET http://localhost:3000/health`
- **API Base**: `GET http://localhost:3000/api/users`
- **Documentation**: Full API examples below

## ✨ **Key Features**

### 🏗️ **REST API Excellence**
- **Complete CRUD Operations** - Create, Read, Update, Delete users
- **Input Validation** - Email format, required fields, data sanitization
- **Error Handling** - Comprehensive error responses with proper HTTP status codes
- **Data Integrity** - Duplicate prevention, referential integrity
- **Professional Responses** - Consistent JSON API format with success flags

### 🐳 **Enterprise Docker Setup**
- **Multi-Environment Support** - Development, Testing, Production containers
- **Multi-Stage Builds** - Optimized production images with security hardening
- **Hot Reload Development** - Live code changes with volume mounting
- **Health Monitoring** - Built-in health checks and auto-restart capabilities
- **Container Orchestration** - Docker Compose for complex workflows

### 🧪 **Comprehensive Testing**
- **100% Test Coverage** - 20+ test cases covering all scenarios
- **Unit & Integration Tests** - Individual endpoints and complete workflows
- **Edge Case Testing** - Malformed data, boundary conditions, error paths
- **Containerized Testing** - Isolated test environments with Docker

### 🛡️ **Production-Ready Security**
- **Non-root Containers** - Security hardened with dedicated user accounts
- **Input Sanitization** - XSS prevention and data validation
- **Error Boundaries** - Graceful failure handling without information leakage
- **Health Endpoints** - Application monitoring and status checking

## 🚀 **Quick Start**

### **Prerequisites**
- [Docker](https://www.docker.com/get-started) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Node.js 18+](https://nodejs.org/) (for local development)

### **🐳 Docker Quick Start (Recommended)**

```bash
# Clone the repository
git clone https://github.com/AminMasharqa/nodejs-rest-api-showcase.git
cd nodejs-rest-api-showcase

# Make scripts executable
chmod +x docker-scripts.sh

# Run tests to verify everything works
./docker-scripts.sh test

# Start development environment with hot reload
./docker-scripts.sh dev

# Or start production environment
./docker-scripts.sh prod
```

### **📦 Local Development Setup**

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Start production server
npm start
```

## 🐳 **Docker Architecture**

### **Container Strategy**

| Container | Purpose | Dockerfile | Use Case |
|-----------|---------|------------|----------|
| **Development** | Hot reload, debugging | `Dockerfile.dev` | Daily development |
| **Testing** | Isolated test runs | `Dockerfile.test` | CI/CD, quality assurance |
| **Production** | Optimized deployment | `Dockerfile` | Live environments |

### **Multi-Stage Production Build**
```dockerfile
# Stage 1: Dependencies installation
FROM node:18-alpine AS builder
# Install and prepare dependencies

# Stage 2: Production optimization  
FROM node:18-alpine AS production
# Copy only production dependencies
# Remove dev tools and test files
# Security hardening with non-root user
```

### **🔧 Docker Commands**

| Command | Description | Environment |
|---------|-------------|-------------|
| `./docker-scripts.sh dev` | Start development with hot reload | Development |
| `./docker-scripts.sh test` | Run all tests in container | Testing |
| `./docker-scripts.sh test-coverage` | Generate coverage report | Testing |
| `./docker-scripts.sh test-watch` | Run tests in watch mode | Testing |
| `./docker-scripts.sh prod` | Start production container | Production |
| `./docker-scripts.sh build` | Build optimized production image | Build |
| `./docker-scripts.sh clean` | Clean up Docker resources | Maintenance |
| `./docker-scripts.sh logs` | View container logs | Monitoring |
| `./docker-scripts.sh health` | Check application health | Monitoring |

### **🔍 Container Features**

#### **Development Container**
- **Hot Reload**: Automatic server restart on code changes
- **Volume Mounting**: Live code synchronization
- **Debug Tools**: Full development dependencies
- **Port Mapping**: `localhost:3000` access

#### **Testing Container**
- **Isolated Environment**: Clean test execution
- **Coverage Reports**: Detailed test coverage analysis
- **CI/CD Ready**: Perfect for automated pipelines
- **Watch Mode**: TDD development support

#### **Production Container**
- **Optimized Size**: Multi-stage build removes dev dependencies
- **Security Hardened**: Non-root user, minimal attack surface
- **Health Checks**: Automatic monitoring and restart
- **Resource Efficient**: Alpine Linux base for minimal footprint

## 📋 **API Documentation**

### **Base URL**: `http://localhost:3000/api/users`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/users` | Get all users | None |
| GET | `/api/users/:id` | Get user by ID | None |
| POST | `/api/users` | Create new user | `{name, email, age}` |
| PUT | `/api/users/:id` | Update user (full) | `{name, email, age}` |
| PATCH | `/api/users/:id` | Update user (partial) | `{name?, email?, age?}` |
| DELETE | `/api/users/:id` | Delete user | None |
| GET | `/health` | Health check | None |

### **📝 Request/Response Examples**

#### **Create User**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":30}'
```

**Response:**
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

**Response:**
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
    }
  ]
}
```

#### **Update User (Partial)**
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age":31}'
```

#### **Error Response Example**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Valid email is required"
  ]
}
```

## 🧪 **Testing**

### **Test Coverage: 20+ Test Cases**

- ✅ **CRUD Operations**: All endpoints tested
- ✅ **Validation Testing**: Input validation and sanitization
- ✅ **Error Handling**: Edge cases and error conditions
- ✅ **Integration Tests**: Complete workflow testing
- ✅ **Edge Cases**: Malformed data, boundary conditions

### **Run Tests**

```bash
# Docker testing (recommended)
./docker-scripts.sh test                 # Run all tests
./docker-scripts.sh test-coverage        # Generate coverage report
./docker-scripts.sh test-watch          # Watch mode for TDD

# Local testing
npm test                                 # Run tests locally
npm run test:coverage                    # Local coverage report
npm run test:watch                       # Local watch mode
```

### **Expected Test Output**
```
✅ Test Suites: 1 passed, 1 total
✅ Tests: 20 passed, 20 total
✅ Snapshots: 0 total
✅ Time: 0.624s
```

## 🏗️ **Project Structure**

```
nodejs-rest-api-showcase/
├── 📄 server.js                # Main application server
├── 📦 package.json             # Dependencies and scripts
├── 🧪 tests/
│   └── api.test.js             # Comprehensive test suite
├── 🐳 Dockerfile               # Production container
├── 🐳 Dockerfile.dev           # Development container  
├── 🐳 Dockerfile.test          # Testing container
├── 🐳 docker-compose.yml       # Container orchestration
├── 🔧 docker-scripts.sh        # Docker management script
├── 📝 README.md               # This documentation
├── 🚫 .dockerignore           # Docker build exclusions
├── 🚫 .gitignore              # Git exclusions
└── 📊 coverage/               # Test coverage reports (generated)
```

## 🛠️ **Technology Stack**

### **Backend Framework**
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing

### **Testing & Quality**
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **ESLint** - Code linting (optional)

### **DevOps & Containerization**
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration
- **Alpine Linux** - Lightweight container base
- **Multi-stage builds** - Production optimization

### **Development Tools**
- **Nodemon** - Development auto-restart
- **npm scripts** - Task automation
- **Volume mounting** - Live code synchronization

## 🔧 **Advanced Usage**

### **Environment Variables**
```bash
# Development
NODE_ENV=development
PORT=3000

# Production  
NODE_ENV=production
PORT=3000
```

### **Docker Compose Profiles**
```bash
# Development profile
docker-compose --profile dev up

# Testing profile
docker-compose --profile test up

# Production profile  
docker-compose --profile prod up
```

### **Custom Docker Commands**
```bash
# Build specific environment
docker build -f Dockerfile.dev -t my-api:dev .

# Run with custom environment
docker run -e NODE_ENV=production -p 3000:3000 my-api:prod

# Execute commands in running container
docker exec -it container_name sh
```

### **Health Monitoring**
```bash
# Check container health
docker inspect container_name --format='{{.State.Health.Status}}'

# Monitor resource usage
docker stats --no-stream

# View detailed logs
docker logs container_name -f
```

## 🚀 **Production Deployment**

### **Build Production Image**
```bash
./docker-scripts.sh build
```

### **Deploy to Cloud Platforms**

#### **Heroku**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku container:push web
heroku container:release web
```

#### **AWS ECS/Fargate**
```bash
# Build and tag for ECR
docker build -t your-registry/api:latest .
docker push your-registry/api:latest
```

#### **Railway**
```bash
# Connect GitHub repository
# Railway auto-deploys from Dockerfile
```

### **Production Checklist**
- ✅ Environment variables configured
- ✅ Health checks enabled
- ✅ Resource limits set
- ✅ Logging configured
- ✅ Monitoring setup

## 🔍 **Monitoring & Debugging**

### **Health Checks**
```bash
# Application health
curl http://localhost:3000/health

# Container health
./docker-scripts.sh health
```

### **Logging**
```bash
# View application logs
./docker-scripts.sh logs

# Follow logs in real-time
docker logs container_name -f
```

### **Performance Monitoring**
```bash
# Resource usage
docker stats --no-stream

# Container inspection
docker inspect container_name
```

## 🧩 **API Design Principles**

### **RESTful Standards**
- **Resource-based URLs** - `/api/users/:id`
- **HTTP Methods** - GET, POST, PUT, PATCH, DELETE
- **Status Codes** - 200, 201, 400, 404, 409, 500
- **JSON Responses** - Consistent format with success flags

### **Error Handling**
- **Graceful Failures** - Never crash the application
- **Meaningful Messages** - Clear error descriptions
- **Proper Status Codes** - HTTP standards compliance
- **Validation Feedback** - Detailed validation errors

### **Data Validation**
- **Input Sanitization** - Trim whitespace, normalize data
- **Type Checking** - Ensure correct data types
- **Business Rules** - Email uniqueness, age ranges
- **Security** - Prevent injection attacks

## 🎯 **Learning Outcomes**

This project demonstrates proficiency in:

### **Backend Development**
- ✅ RESTful API design and implementation
- ✅ HTTP protocol and status codes
- ✅ JSON API standards
- ✅ Error handling strategies
- ✅ Data validation techniques

### **Testing & Quality Assurance**
- ✅ Unit testing with Jest
- ✅ Integration testing strategies
- ✅ Test-driven development (TDD)
- ✅ Code coverage analysis
- ✅ Edge case handling

### **DevOps & Containerization**
- ✅ Docker containerization
- ✅ Multi-stage builds
- ✅ Container orchestration
- ✅ Environment management
- ✅ Production deployment

### **Professional Development**
- ✅ Clean code principles
- ✅ Documentation standards
- ✅ Version control (Git)
- ✅ Project organization
- ✅ Modern development workflows

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `./docker-scripts.sh test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Author**

**Amin Masharqa**
- GitHub: [@AminMasharqa](https://github.com/AminMasharqa)
- LinkedIn: [Connect with me](https://linkedin.com/in/amin-masharqaba28223)

## 🙏 **Acknowledgments**

- Express.js team for the excellent web framework
- Jest team for the comprehensive testing framework
- Docker team for revolutionizing containerization
- Node.js community for continuous innovation

---

⭐ **If this project helped you learn REST APIs or Docker, please give it a star!**

🚀 **Ready to build your own REST API? Fork this repository and start coding!**