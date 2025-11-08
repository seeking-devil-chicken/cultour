import express from "express";
import querycontroller from "./controllers/querycontroller.js";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("site is live!!");
});

app.get("/countries", querycontroller.getQuery, (req, res) => {
  res.status(200).json(res.locals.result);
  console.log(res.locals.result);
});

app.use((err, req, res) => {
  const defaultErr = {
    log: "there was an error",
    status: 500,
    message: "something went wrong",
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
