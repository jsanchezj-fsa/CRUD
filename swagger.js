const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Tareas",
      version: "1.0.0",
      description: "Documentación de la API de tareas con Express y Firebase",
    },
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "string", example: "abc123" },
            title: { type: "string", example: "Mi tarea" },
            completed: { type: "boolean", example: false },
          },
        },
      },
    },
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
