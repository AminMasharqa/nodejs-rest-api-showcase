# REST API CRUD Tutorial with Node.js

A complete REST API implementation with full CRUD operations, mock database, and comprehensive testing.

## 🚀 Quick Start

### 1. Setup Project
```bash
# Create project directory
mkdir rest-api-tutorial
cd rest-api-tutorial

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors

# Install dev dependencies
npm install --save-dev jest supertest nodemon
```

### 2. Project Structure
```
rest-api-tutorial/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── tests/
│   └── api.test.js    # Test file
└── README.md          # This file
```

### 3. Run the Application
```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📋 API Endpoints

### Base URL: `http://localhost:3000/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user (full) |
| PATCH | `/api/users/:id` | Update user (partial) |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/health` | Health check |

## 📝 Request/Response Examples

### GET /api/users
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

### POST /api/users
**Request:**
```json
{
  "name": "New User",
  "email": "new@example.com",
  "age": 25
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 4,
    "name": "New User",
    "email": "new@example.com",
    "age": 25
  }
}
```

### PUT /api/users/:id
**Request:**
```json
{
  "name": "Updated User",
  "email": "updated@example.com",
  "age": 35
}
```

### PATCH /api/users/:id
**Request:**
```json
{
  "name": "Partially Updated Name"
}
```

### Error Response Example
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

## 🧪 Testing with cURL

### Get all users
```bash
curl http://localhost:3000/api/users
```

### Get single user
```bash
curl http://localhost:3000/api/users/1
```

### Create user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","age":28}'
```

### Update user (PUT)
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User","email":"updated@example.com","age":32}'
```

### Partial update (PATCH)
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name Only"}'
```

### Delete user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 🏗️ Key Concepts Explained

### 1. Mock Database
- Uses in-memory array to store data
- Data resets when server restarts
- Good for learning and testing
- Easy to replace with real database later

### 2. HTTP Status Codes
- `200` - OK (successful GET, PUT, PATCH, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

### 3. CRUD Operations
- **C**reate - POST `/api/users`
- **R**ead - GET `/api/users` and `/api/users/:id`
- **U**pdate - PUT and PATCH `/api/users/:id`
- **D**elete - DELETE `/api/users/:id`

### 4. Validation
- Required fields checking
- Email format validation
- Age range validation
- Duplicate email prevention
- Input sanitization (trimming whitespace)

### 5. Error Handling
- Try-catch blocks for all routes
- Consistent error response format
- Proper HTTP status codes
- Validation error messages

## 🧪 Testing Strategy

### Unit Tests
- Individual endpoint testing
- Input validation testing
- Error condition testing
- Edge case handling

### Integration Tests
- Complete CRUD flow testing
- Data persistence verification
- Cross-endpoint interactions

### Test Categories
1. **Happy Path Tests** - Normal successful operations
2. **Error Path Tests** - Invalid input, missing resources
3. **Edge Cases** - Boundary conditions, malformed data
4. **Integration Tests** - Full workflow testing

## 🔧 Advanced Features to Add

### 1. Query Parameters
```javascript
// GET /api/users?page=1&limit=10&sort=name
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10, sort } = req.query;
  // Implement pagination and sorting
});
```

### 2. Filtering
```javascript
// GET /api/users?age=25&name=John
app.get('/api/users', (req, res) => {
  let filteredUsers = users;
  if (req.query.age) {
    filteredUsers = filteredUsers.filter(u => u.age == req.query.age);
  }
  // Add more filters
});
```

### 3. Database Integration
Replace the mock database with a real database:
- MongoDB with Mongoose
- PostgreSQL with Sequelize
- SQLite with Sequelize

### 4. Authentication & Authorization
- JWT tokens
- User roles and permissions
- Protected routes

### 5. Input Validation Library
Use libraries like Joi or express-validator:
```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(1).max(120).required()
});
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Tests failing**
   ```bash
   # Clear Jest cache
   npx jest --clearCache
   ```

3. **Module not found**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Tips
1. Add console.log statements to track data flow
2. Use Postman or Insomnia for manual API testing
3. Check request headers and body format
4. Verify JSON syntax in request bodies
5. Use network tab in browser dev tools for debugging

## 📊 Testing with Postman

### Collection Setup
Create a Postman collection with these requests:

1. **GET All Users**
   - URL: `http://localhost:3000/api/users`
   - Method: GET

2. **GET Single User**
   - URL: `http://localhost:3000/api/users/1`
   - Method: GET

3. **CREATE User**
   - URL: `http://localhost:3000/api/users`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Postman User",
     "email": "postman@example.com",
     "age": 30
   }
   ```

4. **UPDATE User (PUT)**
   - URL: `http://localhost:3000/api/users/1`
   - Method: PUT
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Updated User",
     "email": "updated@example.com",
     "age": 35
   }
   ```

5. **PARTIAL UPDATE (PATCH)**
   - URL: `http://localhost:3000/api/users/1`
   - Method: PATCH
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Only Name Updated"
   }
   ```

6. **DELETE User**
   - URL: `http://localhost:3000/api/users/1`
   - Method: DELETE

## 🚀 Next Steps & Learning Path

### Beginner Level ✅
- [x] Basic Express server setup
- [x] CRUD operations implementation
- [x] Mock database usage
- [x] Basic error handling
- [x] Writing tests with Jest

### Intermediate Level 📚
- [ ] Add input validation with Joi or express-validator
- [ ] Implement pagination and sorting
- [ ] Add request logging middleware
- [ ] Environment variables configuration
- [ ] API documentation with Swagger

### Advanced Level 🎯
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Authentication with JWT
- [ ] Rate limiting and security headers
- [ ] Docker containerization
- [ ] Deploy to cloud (Heroku, AWS, etc.)

## 📚 Additional Resources

### Documentation
- [Express.js Official Docs](https://expressjs.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Supertest for API Testing](https://github.com/visionmedia/supertest)

### Learning Materials
- REST API design principles
- HTTP status codes reference
- JSON Schema validation
- Database design patterns

### Tools for Development
- **API Testing**: Postman, Insomnia, Thunder Client (VS Code)
- **Database**: MongoDB Compass, pgAdmin, SQLite Browser
- **Code Editor**: VS Code with REST Client extension
- **Monitoring**: Morgan for request logging

## 💡 Pro Tips

1. **Always validate input data** - Never trust user input
2. **Use proper HTTP status codes** - Makes debugging easier
3. **Implement consistent error responses** - Helps frontend developers
4. **Write tests first** - Test-driven development approach
5. **Use middleware for common functionality** - DRY principle
6. **Handle async operations properly** - Use try-catch with async/await
7. **Log important events** - Helps with debugging and monitoring
8. **Use environment variables** - For configuration and secrets

## 🔒 Security Considerations

Even for learning projects, consider these security basics:

```javascript
// Add basic security middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet()); // Security headers
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

---

## 🎉 Congratulations!

You now have a complete REST API with:
- ✅ Full CRUD operations
- ✅ Input validation
- ✅ Error handling
- ✅ Comprehensive testing
- ✅ Mock database
- ✅ Professional structure

This foundation will serve you well as you progress to more complex applications with real databases, authentication, and deployment!