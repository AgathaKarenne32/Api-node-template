import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../database";
import { CreateUserDto, LoginDto, UserResponseDto } from "../dtos/user.dto";
import { HTTPError } from "../utils/http.error";
import { envs } from "../envs";

export class UserService {
  // 1. Criar Usuário (Cadastro)
  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await prisma.user.findUnique({ where: { email: data.email } });

    if (userExists) {
      throw new HTTPError(409, "Este e-mail já está em uso.");
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Removemos a senha do retorno por segurança
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // 2. Autenticar Usuário (Login)
  async login(data: LoginDto): Promise<{ user: UserResponseDto; token: string }> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new HTTPError(401, "E-mail ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HTTPError(401, "E-mail ou senha inválidos.");
    }


    // Localize a parte do jwt.sign e deixe exatamente assim:
    const token = jwt.sign(
      { id: user.id },
      String(envs.JWT_SECRET), // Garante que é uma string
      {
        expiresIn: envs.JWT_EXPIRES_IN as any, // Evita erro de compatibilidade de string/number
      }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}