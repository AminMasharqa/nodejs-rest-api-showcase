#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Help function
show_help() {
    echo "Docker Management Script for Node.js REST API"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev              Start development environment with hot reload"
    echo "  test             Run tests in Docker container"
    echo "  test-coverage    Run tests with coverage report"
    echo "  test-watch       Run tests in watch mode"
    echo "  prod             Start production environment"
    echo "  build            Build production Docker image"
    echo "  logs             Show application logs"
    echo "  health           Check application health"
    echo "  stop             Stop all containers"
    echo "  clean            Clean up Docker resources"
    echo "  help             Show this help message"
}

# Development environment
start_dev() {
    print_info "Starting development environment..."
    docker-compose -f docker-compose.yml --profile dev up --build
}

# Test environment
run_tests() {
    print_info "Running tests in Docker..."
    docker-compose -f docker-compose.yml --profile test up --build test
}

# Test with coverage
run_test_coverage() {
    print_info "Running tests with coverage report..."
    
    # Create a temporary Dockerfile for coverage
    cat > Dockerfile.coverage << 'EOF'
FROM node:18-alpine

RUN apk add --no-cache dumb-init

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY --chown=nodejs:nodejs . .

USER nodejs

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "test:coverage"]
EOF

    # Build and run coverage container
    docker build -f Dockerfile.coverage -t nodejs-rest-api-showcase-coverage:latest .
    
    # Create coverage directory if it doesn't exist
    mkdir -p coverage
    
    # Run container with volume mount for coverage output
    docker run --rm \
        -v "$(pwd)/coverage:/app/coverage" \
        nodejs-rest-api-showcase-coverage:latest
    
    # Clean up temporary Dockerfile
    rm -f Dockerfile.coverage
    
    print_success "Coverage report generated in ./coverage directory"
    print_info "Open ./coverage/lcov-report/index.html in your browser to view detailed coverage"
}

# Test watch mode
run_test_watch() {
    print_info "Running tests in watch mode..."
    
    # Create a temporary Dockerfile for watch mode
    cat > Dockerfile.watch << 'EOF'
FROM node:18-alpine

RUN apk add --no-cache dumb-init

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY --chown=nodejs:nodejs . .

USER nodejs

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "test:watch"]
EOF

    # Build and run watch container
    docker build -f Dockerfile.watch -t nodejs-rest-api-showcase-watch:latest .
    docker run --rm -it \
        -v "$(pwd):/app" \
        -v /app/node_modules \
        nodejs-rest-api-showcase-watch:latest
    
    # Clean up
    rm -f Dockerfile.watch
}

# Production environment
start_prod() {
    print_info "Starting production environment..."
    docker-compose -f docker-compose.yml --profile prod up --build -d
    print_success "Production server running at http://localhost:3000"
}

# Build production image
build_prod() {
    print_info "Building production Docker image..."
    docker build -f Dockerfile -t nodejs-rest-api-showcase:latest .
    print_success "Production image built successfully"
}

# Show logs
show_logs() {
    if docker ps --format "table {{.Names}}" | grep -q "nodejs-rest-api-showcase"; then
        docker-compose logs -f
    else
        print_warning "No containers are currently running"
    fi
}

# Health check
check_health() {
    print_info "Checking application health..."
    
    # Check if any containers are running
    if docker ps --format "table {{.Names}}" | grep -q "nodejs-rest-api-showcase"; then
        response=$(curl -s http://localhost:3000/health 2>/dev/null)
        if [ $? -eq 0 ]; then
            print_success "Application is healthy: $response"
        else
            print_error "Application health check failed"
        fi
        
        # Show container status
        print_info "Container status:"
        docker ps --filter "name=nodejs-rest-api-showcase" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    else
        print_warning "No containers are currently running"
    fi
}

# Stop containers
stop_containers() {
    print_info "Stopping all containers..."
    docker-compose down
    print_success "All containers stopped"
}

# Clean up Docker resources
cleanup() {
    print_info "Cleaning up Docker resources..."
    
    # Stop containers
    docker-compose down
    
    # Remove containers
    docker container prune -f
    
    # Remove images
    docker rmi $(docker images "nodejs-rest-api-showcase*" -q) 2>/dev/null || true
    
    # Remove volumes
    docker volume prune -f
    
    # Remove networks
    docker network prune -f
    
    print_success "Docker cleanup completed"
}

# Main script logic
case "$1" in
    "dev")
        start_dev
        ;;
    "test")
        run_tests
        ;;
    "test-coverage")
        run_test_coverage
        ;;
    "test-watch")
        run_test_watch
        ;;
    "prod")
        start_prod
        ;;
    "build")
        build_prod
        ;;
    "logs")
        show_logs
        ;;
    "health")
        check_health
        ;;
    "stop")
        stop_containers
        ;;
    "clean")
        cleanup
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    "")
        print_error "No command specified"
        show_help
        exit 1
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac