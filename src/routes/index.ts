import { Router } from "express";
import userRoutes from "./user.routes";

const router = Router();

router.use("/users", userRoutes);


import taskRoutes from "./task.routes"; // Importe aqui


router.use("/users", userRoutes);
router.use("/tasks", taskRoutes); // Registre aqui

export default router;