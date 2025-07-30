const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API pour application e-commerce",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
  },
  apis: ["./routes/*.js", "./docs/*.yaml"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
