// tests/api.test.js
const request = require('supertest');
const app = require('../server');

describe('REST API Tests', () => {
  let createdUserId;

  // Test GET /api/users - Get all users
  describe('GET /api/users', () => {
    it('should get all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBe(response.body.data.length);
    });
  });

  // Test POST /api/users - Create user
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com',
        age: 28
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
      expect(response.body.data.age).toBe(newUser.age);
      expect(response.body.data.id).toBeDefined();

      // Store the created user ID for later tests
      createdUserId = response.body.data.id;
    });

    it('should not create user with invalid data', async () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email',
        age: 150
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeInstanceOf(Array);
      expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('should not create user with duplicate email', async () => {
      const duplicateUser = {
        name: 'Another User',
        email: 'john@example.com', // This email already exists
        age: 25
      };

      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email already exists');
    });

    it('should not create user with missing fields', async () => {
      const incompleteUser = {
        name: 'Incomplete User'
        // Missing email and age
      };

      const response = await request(app)
        .post('/api/users')
        .send(incompleteUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Valid email is required');
    });
  });

  // Test GET /api/users/:id - Get single user
  describe('GET /api/users/:id', () => {
    it('should get a user by ID', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.name).toBeDefined();
      expect(response.body.data.email).toBeDefined();
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });
  });

  // Test PUT /api/users/:id - Update user (full update)
  describe('PUT /api/users/:id', () => {
    it('should update a user completely', async () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com',
        age: 32
      };

      const response = await request(app)
        .put(`/api/users/${createdUserId}`)
        .send(updatedUser)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updatedUser.name);
      expect(response.body.data.email).toBe(updatedUser.email);
      expect(response.body.data.age).toBe(updatedUser.age);
    });

    it('should return 404 for non-existent user', async () => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@example.com',
        age: 32
      };

      const response = await request(app)
        .put('/api/users/999')
        .send(updatedUser)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });

    it('should not update with invalid data', async () => {
      const invalidUser = {
        name: '',
        email: 'invalid-email',
        age: -5
      };

      const response = await request(app)
        .put('/api/users/1')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });

  // Test PATCH /api/users/:id - Partial update
  describe('PATCH /api/users/:id', () => {
    it('should partially update a user', async () => {
      const partialUpdate = {
        name: 'Partially Updated User'
      };

      const response = await request(app)
        .patch(`/api/users/${createdUserId}`)
        .send(partialUpdate)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(partialUpdate.name);
      // Other fields should remain unchanged
      expect(response.body.data.email).toBe('updated@example.com');
    });

    it('should return 404 for non-existent user', async () => {
      const partialUpdate = {
        name: 'Updated Name'
      };

      const response = await request(app)
        .patch('/api/users/999')
        .send(partialUpdate)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });
  });

  // Test DELETE /api/users/:id - Delete user
  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app)
        .delete(`/api/users/${createdUserId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User deleted successfully');
      expect(response.body.data.id).toBe(createdUserId);
    });

    it('should return 404 when trying to delete non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });

    it('should return 404 when trying to delete already deleted user', async () => {
      const response = await request(app)
        .delete(`/api/users/${createdUserId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User not found');
    });
  });

  // Test Health Check
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  // Test 404 Handler
  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });

  // Test Edge Cases
  describe('Edge Cases', () => {
    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/users')
        .send('invalid json')
        .set('Content-Type', 'application/json')
        .expect(400);
    });

    it('should trim whitespace from user input', async () => {
      const userWithWhitespace = {
        name: '  Whitespace User  ',
        email: '  WHITESPACE@EXAMPLE.COM  ',
        age: 30
      };

      const response = await request(app)
        .post('/api/users')
        .send(userWithWhitespace)
        .expect(201);

      expect(response.body.data.name).toBe('Whitespace User');
      expect(response.body.data.email).toBe('whitespace@example.com');
    });
  });
});

// Integration Tests
describe('Integration Tests', () => {
  it('should perform complete CRUD operations', async () => {
    // Create
    const newUser = {
      name: 'Integration User',
      email: 'integration@example.com',
      age: 25
    };

    const createResponse = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    const userId = createResponse.body.data.id;

    // Read
    const readResponse = await request(app)
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(readResponse.body.data.name).toBe(newUser.name);

    // Update
    const updatedUser = {
      name: 'Updated Integration User',
      email: 'updated-integration@example.com',
      age: 30
    };

    const updateResponse = await request(app)
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .expect(200);

    expect(updateResponse.body.data.name).toBe(updatedUser.name);

    // Delete
    await request(app)
      .delete(`/api/users/${userId}`)
      .expect(200);

    // Verify deletion
    await request(app)
      .get(`/api/users/${userId}`)
      .expect(404);
  });
});