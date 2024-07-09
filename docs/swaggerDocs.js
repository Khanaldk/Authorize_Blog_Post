module.exports = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "blog In Nodejs",
      description:
        "It is used to create post ,like post and updated and deleted based on Role.",
      servers: ["http://localhost:7000"],
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["routes/*.js"],
};
