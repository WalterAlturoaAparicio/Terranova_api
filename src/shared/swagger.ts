import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Terranova Api",
      version,
      description: "Documentacion Prueba Tecnica",
    },
    servers: [
      { url: `http://localhost:${port}` },
      { url: `https://vast-depths-48635.herokuapp.com` },
    ],
  },
  apis: ["./src/shared/*.swagger.ts", "./src/components/**/*.router.ts"],
};

export const specs = swaggerJSDoc(options);
