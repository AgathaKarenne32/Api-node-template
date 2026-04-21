import { Request, Response } from "express";
import { TaskService } from "../services";
import { onError } from "../utils";

export class TaskController {
    private taskService = new TaskService();

    public create = async (req: Request, res: Response) => {
        try {
            const result = await this.taskService.create(req.user.id, req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            onError(error, res);
        }
    };

    public list = async (req: Request, res: Response) => {
        try {
            const result = await this.taskService.getAll(req.user.id);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            onError(error, res);
        }
    };

    public update = async (req: Request, res: Response) => {
        try {
            // No método update, mude para:
            const result = await this.taskService.update(
                String(req.params.id), // Força para string
                req.user.id,
                req.body
            );

            // No método delete, mude para:
            await this.taskService.delete(
                String(req.params.id), // Força para string
                req.user.id
            );
        } catch (error) {
            onError(error, res);
        }
    };

    public delete = async (req: Request, res: Response) => {
        try {
            await this.taskService.delete(
                String(req.params.id), // Força para string
                req.user.id
            );
        } catch (error) {
            onError(error, res);
        }
    };
}