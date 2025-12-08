import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class DeleteUser {
  constructor(private readonly userRespository: IUserRepository) {}

  async execute(id: string) {
    // validating if the user at least exist before deleting
    const foundUser = await this.userRespository.findById(id);
    if (!foundUser) throw new Error("User does not exist!");

    // error handling
    try {
      // deleting user in the repository
      await this.userRespository.deleteById(id);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
