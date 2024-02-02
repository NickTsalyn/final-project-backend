import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Task PRO V1 API docs',
            version: '1.0.0',
            description: "API documentation for project 'task-pro-backend'. [Backend github repository](https://github.com/NickTsalyn/task-pro-backend)",
            license: {
                "name": "MIT",
                "url": "https://opensource.org/licenses/MIT"
            }
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
  
    // Paths to files with annotations
    apis: ['./swagger/swagger-doc.js', './routes/auth.js'],
};


export const specs = swaggerJsdoc(options);
