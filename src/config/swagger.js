const swaggerOpt = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: process.env.PROJECT,
            version: "1.0.0",
            description: process.env.ABOUT,
        },
        servers: [
            {
                url: `${process.env.HOST}`,
                description: "development server",
            },
        ],
        components: {
            securitySchemes: {
                Authorization: { // Arbitrary name for the security scheme
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Optional, helps indicate the format of the bearer token
                }
            }
        },
    },
    apis: [
        "./src/model/*.js",
        "./src/router/*.js"
    ]
};

export default swaggerOpt
