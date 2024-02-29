const swaggerOpt = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: process.env.PROJECT,
            version: '1.0.0',
            description: process.env.ABOUT,
        },
        servers: [
            {
                url: `${process.env.HOST}`,
                description: 'development server',
            },
        ],
    },
    apis: ['./src/router/*.js']
};

export default swaggerOpt
