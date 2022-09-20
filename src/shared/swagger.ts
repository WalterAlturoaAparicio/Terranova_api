import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Terranova Api",
      version,
      description: "Documentacion Prueba Tecnica",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [
    "./src/shared/*.swagger.ts",
    "./src/components/**/*.router.ts",
  ],
};

export const specs = swaggerJSDoc(options);
