import express from "express";
import querycontroller from "./controllers/querycontroller.js";
import postcontroller from "./controllers/postcontroller.js";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("incoming", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("site is live!!");
});

app.get("/countries", querycontroller.getQuery, (req, res) => {
  res.status(200).json(res.locals.result);
});

app.post("/userpost", postcontroller.postData, (req, res) => {
  res.status(200).json(res.locals.newPost);
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.log("Error handler triggered!");
  console.log("Error:", err);

  const defaultErr = {
    log: "there was an error",
    status: 500,
    message: "something went wrong",
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  res.statusCode = errorObj.status;
  res.json(errorObj.message);
});

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
