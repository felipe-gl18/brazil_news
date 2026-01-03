import exphbs from "express-handlebars";
import { Express } from "express";
export default function setupHandlebarsEngine(app: Express) {
  app.engine(
    "handlebars",
    exphbs.engine({
      extname: ".handlebars",
      defaultLayout: "main",
      layoutsDir: "src/infra/views/layouts/",
      partialsDir: "src/infra/views/partials/",
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", "src/infra/views/");
}
