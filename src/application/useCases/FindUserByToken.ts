import { ITokenRepository } from "../../domain/repositories/ITokenRepository";

export class FindUserByToken {
  constructor(private readonly tokenRepository: ITokenRepository) {}
  async execute(token: string) {
    return await this.tokenRepository.findByToken(token);
  }
}
