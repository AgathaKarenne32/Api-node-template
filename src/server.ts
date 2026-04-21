import express from "express";
import router from "./routes";
import { envs } from "./envs";

const app = express();
app.use(express.json());

app.use(router);

app.listen(envs.PORT, () => {
  console.log(`Server running on port ${envs.PORT}`);
});