#!/bin/bash
# docker-scripts.sh - Master Docker management script

set -e  # Exit on any error
export DOCKER_BUILDKIT=0

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Development environment
dev() {
    log_info "Starting development environment..."
    docker-compose --profile dev up --build
}

# Production environment
prod() {
    log_info "Starting production environment..."
    docker-compose --profile prod up --build -d
    log_success "Production server running at http://localhost:3000"
}

# Run tests
test() {
    log_info "Running tests in Docker..."
    docker-compose --profile test run --rm app-test
}

# Run tests with coverage
test_coverage() {
    log_info "Running tests with coverage..."
    docker-compose --profile test run --rm app-test-coverage
    log_success "Coverage report generated in ./coverage/"
}

# Run tests in watch mode
test_watch() {
    log_info "Running tests in watch mode..."
    docker-compose --profile test run --rm app-test-watch
}

# Build production image
build() {
    log_info "Building production Docker image..."
    docker build -t nodejs-rest-api:latest .
    log_success "Production image built successfully"
}

# Clean up Docker resources
clean() {
    log_warning "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    log_success "Docker cleanup completed"
}

# Show logs
logs() {
    docker-compose logs -f
}

# Stop all services
stop() {
    log_info "Stopping all services..."
    docker-compose down
    log_success "All services stopped"
}

# Health check
health() {
    log_info "Checking application health..."
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log_success "Application is healthy!"
    else
        log_error "Application is not responding"
        exit 1
    fi
}

# Show help
help() {
    echo "Docker Management Script for Node.js REST API"
    echo ""
    echo "Usage: ./docker-scripts.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev           Start development environment with hot reload"
    echo "  prod          Start production environment"
    echo "  test          Run tests once"
    echo "  test-coverage Run tests with coverage report"
    echo "  test-watch    Run tests in watch mode"
    echo "  build         Build production Docker image"
    echo "  clean         Clean up Docker resources"
    echo "  logs          Show application logs"
    echo "  stop          Stop all services"
    echo "  health        Check application health"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh dev         # Start development"
    echo "  ./docker-scripts.sh test        # Run tests"
    echo "  ./docker-scripts.sh prod        # Start production"
}

# Main script logic
case "$1" in
    dev)
        dev
        ;;
    prod)
        prod
        ;;
    test)
        test
        ;;
    test-coverage)
        test_coverage
        ;;
    test-watch)
        test_watch
        ;;
    build)
        build
        ;;
    clean)
        clean
        ;;
    logs)
        logs
        ;;
    stop)
        stop
        ;;
    health)
        health
        ;;
    help|--help|-h)
        help
        ;;
    *)
        log_error "Unknown command: $1"
        echo ""
        help
        exit 1
        ;;
esac