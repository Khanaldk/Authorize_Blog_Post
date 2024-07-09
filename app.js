const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/indexRoutes");
const swaggeruiexpress = require("swagger-ui-express");
const swaggerjsdocs = require("swagger-jsdoc");
const swaggerDocs = require("./docs/swaggerDocs");
dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);
app.use(
  "/api-docs",
  swaggeruiexpress.serve,
  swaggeruiexpress.setup(swaggerjsdocs(swaggerDocs))
);

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
