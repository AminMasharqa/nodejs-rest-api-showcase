// server.js - Main server file
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// JSON parsing error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format'
    });
  }
  next(err);
});

// Mock Database - In-memory storage
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
];

let nextId = 4; // For generating new IDs

// Helper function to find user by ID
const findUserById = (id) => users.find(user => user.id === parseInt(id));

// Helper function to validate user data
const validateUser = (userData) => {
  const errors = [];
  
  if (!userData.name || userData.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!userData.email || !userData.email.includes('@')) {
    errors.push('Valid email is required');
  }
  
  if (!userData.age || userData.age < 1 || userData.age > 120) {
    errors.push('Age must be between 1 and 120');
  }
  
  return errors;
};

// Routes

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// GET /api/users/:id - Get single user
app.get('/api/users/:id', (req, res) => {
  try {
    const user = findUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Validate input
    const errors = validateUser({ name, email, age });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Create new user
    const newUser = {
      id: nextId++,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: parseInt(age)
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Update user (full update)
app.put('/api/users/:id', (req, res) => {
  try {
    const user = findUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const { name, email, age } = req.body;
    
    // Validate input
    const errors = validateUser({ name, email, age });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Check if email already exists for another user
    const existingUser = users.find(u => u.email === email && u.id !== user.id);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Update user
    user.name = name.trim();
    user.email = email.trim().toLowerCase();
    user.age = parseInt(age);
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// PATCH /api/users/:id - Partial update user
app.patch('/api/users/:id', (req, res) => {
  try {
    const user = findUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const updates = req.body;
    
    // Validate only provided fields
    const errors = [];
    if (updates.name !== undefined && (!updates.name || updates.name.trim().length === 0)) {
      errors.push('Name cannot be empty');
    }
    if (updates.email !== undefined && (!updates.email || !updates.email.includes('@'))) {
      errors.push('Valid email is required');
    }
    if (updates.age !== undefined && (updates.age < 1 || updates.age > 120)) {
      errors.push('Age must be between 1 and 120');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
    
    // Check email uniqueness if email is being updated
    if (updates.email && updates.email !== user.email) {
      const existingUser = users.find(u => u.email === updates.email && u.id !== user.id);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }
    
    // Apply updates
    if (updates.name) user.name = updates.name.trim();
    if (updates.email) user.email = updates.email.trim().toLowerCase();
    if (updates.age) user.age = parseInt(updates.age);
    
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API Base URL: http://localhost:${PORT}/api/users`);
  });
}

module.exports = app;