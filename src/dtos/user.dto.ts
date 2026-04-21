import { User } from "@prisma/client";

/**
 * Dados necessários para criar um utilizador.
 * Omitimos os campos gerados automaticamente pelo banco de dados.
 */
export type CreateUserDto = Omit<User, "id" | "createdAt" | "updatedAt">;

/**
 * Interface para a tentativa de login.
 */
export interface LoginDto {
    email: string;
    password: string;
}

/**
 * Resposta padrão de utilizador para o frontend.
 * Removemos a password por questões óbvias de segurança.
 */
export type UserResponseDto = Omit<User, "password">;