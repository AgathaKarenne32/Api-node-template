import { prisma } from "../database";
import { CreateTaskDto, UpdateTaskDto } from "../dtos";
import { HTTPError } from "../utils/http.error";

export class TaskService {
    async create(userId: string, data: CreateTaskDto) {
        return await prisma.task.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async getAll(userId: string) {
        return await prisma.task.findMany({
            where: { userId },
        });
    }

    async update(id: string, userId: string, data: UpdateTaskDto) {
        const task = await prisma.task.findFirst({ where: { id, userId } });

        if (!task) {
            throw new HTTPError(404, "Tarefa não encontrada.");
        }

        return await prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: string, userId: string) {
        const task = await prisma.task.findFirst({ where: { id, userId } });

        if (!task) {
            throw new HTTPError(404, "Tarefa não encontrada.");
        }

        await prisma.task.delete({ where: { id } });
    }
}