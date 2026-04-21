import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.use("/users", userRoutes);

// Remova as linhas de "export { ... }" que estavam causando conflito
// e mantenha apenas a exportação do router principal
export default router;