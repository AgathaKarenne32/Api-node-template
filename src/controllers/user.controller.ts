import { Request, Response } from "express";
import { UserService } from "../services";
import { onError } from "../utils";

export class UserController {
    private userService = new UserService();

    public register = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.create(req.body);
            res.status(201).json({
                success: true,
                message: "Usuário criado com sucesso.",
                data: result,
            });
        } catch (error) {
            onError(error, res);
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.login(req.body);
            res.status(200).json({
                success: true,
                message: "Login realizado com sucesso.",
                data: result,
            });
        } catch (error) {
            onError(error, res);
        }
    };
}