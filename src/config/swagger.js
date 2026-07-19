import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "Production Ready URL Shortener Backend",
        },

        servers: [
            {
                url: "https://codealpha-urlshortener-lx5b.onrender.com",
                description: "Production Server",
            },
        ],
    },

    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };