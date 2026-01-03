import express from "express";
import "dotenv/config";
import { registerUserRoute } from "./routes/registerUser.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { updateUserRoute } from "./routes/UpdateUser.js";
import setupHandlebarsEngine from "./view-engine/handlebars.engine.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupHandlebarsEngine(app);

app.use("/register", registerUserRoute);
app.use("/update", updateUserRoute);

app.get("/", (req, res) => {
  res.render("home");
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`The server is running on port ${process.env.PORT || 3000}`);
});
