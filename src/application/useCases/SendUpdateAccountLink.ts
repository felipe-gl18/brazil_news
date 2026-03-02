import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ICryptoService } from "../services/ICryptoService";

export class SendUpdateAccountLink {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    const token = this.cryptoService.generateRandomToken();
    await this.tokenRepository.save(
      token,
      user.id!,
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    ); // 24 hours

    const link = `${process.env.FRONTEND_URL}/update-account?token=${token}`;
    return link;
  }
}
