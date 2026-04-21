import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "../envs";
import { HTTPError } from "../utils/http.error";
import { onError } from "../utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new HTTPError(401, "Token não fornecido.");
        }

        // O formato esperado é "Bearer <TOKEN>"
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new HTTPError(401, "Token mal formatado.");
        }

        const token = parts[1];

        jwt.verify(token, envs.JWT_SECRET as string, (err, decoded: any) => {
            if (err) {
                return next(new HTTPError(401, "Token inválido ou expirado."));
            }

            // Injeta o ID do usuário no Request para uso posterior nos Services
            req.user = {
                id: decoded.id,
                name: decoded.name || "",
                username: decoded.username || ""
            };

            return next();
        });
    } catch (error) {
        onError(error, res);
    }
};