import { Router } from "express";
import { TaskController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = Router();
const taskController = new TaskController();

// Aplica o middleware de autenticação em todas as rotas abaixo
router.use(authMiddleware);

router.post("/", taskController.create);
router.get("/", taskController.list);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;