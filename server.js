const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const EXPRESS_PORT = 80;

const endpoints = require("./routes");
class ExpressServer {
    /**
     * This is a wrapped class created to manage multiple actions that need to
     *  be performed before the server starts
     * @param {String | Number} port The port to run the express server on
     */
    constructor (port) {
        /**
         * @type {String | Number}
         */
        this.port = port;
        /**
         * @type {import("express").Express}
         */
        this.app = express();
        
        this.setupMiddleware();
    }

    setupMiddleware () {
        // this.setupAllowedMedia();
        this.app.use(cors());
        this.app.use(express.json());
        const options = {
            definition: {
              openapi: "3.0.0",
              info: {
                title: "Bussr Express API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple CRUD API application made with Express and documented with Swagger",
                license: {
                  name: "MIT",
                  url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                  name: "Bussr",
                  url: "https://test.com",
                  email: "info@email.com",
                },
              },
              components: {
                securitySchemes: {
                  bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                  }
                }
              },
              security: [{
                bearerAuth: []
              }],
              servers: [
                {
                  url: "http://localhost:9000",
                },
              ],
            },
            apis: ["./functions/*.js"],
          };
          
          const specs = swaggerJsdoc(options);
          this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
          );
        this.app.use((req, res, next) => {
            return next();
        });
        this.app.use(express.urlencoded({ extended: false }));
    }

    setupEndpoints () {
        endpoints.forEach((endpoint) => {
            console.log(`${(endpoint.method).toUpperCase()} - http://localhost:9000${endpoint.path}`);
            this.app[endpoint.method](endpoint.path, endpoint.handler);
        });
    }


    launch () {
        this.setupEndpoints();
        const port = this.port;
        this.server = this.app.listen(port);
        this.server.on("listening", function () {
            console.warn(`Now Listening on port 🚀 ${port}`);
        });
    }

    async close () {
        if (this.server !== undefined) {
            await this.server.close();
            console.error(`Server on port ${this.port} shut down 🧨`);
        }
    }
}
const server = new ExpressServer(EXPRESS_PORT);
module.exports = server;
