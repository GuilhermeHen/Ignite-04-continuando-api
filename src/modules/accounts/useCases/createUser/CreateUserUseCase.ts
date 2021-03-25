import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import ICreateUserDTO from "../../repositories/interfaces/ICreateUserDTO";
import { IUserRepository } from "../../repositories/interfaces/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User alredy exists");
    }

    const passwordHash = await hash(password, 1);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
