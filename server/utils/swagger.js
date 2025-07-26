const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API pour application e-commerce',
      contact: {
        name: 'API Support',
        email: 'support@ecommerce.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique de l\'utilisateur'
            },
            username: {
              type: 'string',
              description: 'Nom d\'utilisateur'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email'
            },
            password: {
              type: 'string',
              description: 'Mot de passe'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'Rôle de l\'utilisateur'
            },
            reduction: {
              type: 'number',
              minimum: 0,
              default: 0,
              description: 'Pourcentage de réduction'
            },
            is_active: {
              type: 'boolean',
              default: true,
              description: 'Statut actif de l\'utilisateur'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière mise à jour'
            }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'integer'
            },
            username: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            role: {
              type: 'string'
            },
            reduction: {
              type: 'number'
            },
            is_active: {
              type: 'boolean'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Message d\'erreur'
            },
            details: {
              type: 'string',
              description: 'Détails de l\'erreur'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js'] // Chemins vers les fichiers contenant les annotations Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;