import { Task } from "@prisma/client";

/**
 * Dados para criar uma tarefa. 
 * O userId virá do token, por isso não o pedimos no corpo da requisição.
 */
export type CreateTaskDto = Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">;

/**
 * Dados para atualizar uma tarefa (todos os campos são opcionais aqui).
 */
export type UpdateTaskDto = Partial<CreateTaskDto>;