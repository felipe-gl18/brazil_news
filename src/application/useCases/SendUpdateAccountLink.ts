import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { ICryptoService } from "../services/ICryptoService";

export class SendUpdateAccountLink {
  constructor(
    private readonly tokenRepository: ITokenRepository,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(userId: string) {
    const token = this.cryptoService.generateRandomToken();
    await this.tokenRepository.save(
      token,
      userId,
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    ); // 24 hours
    const link = `${process.env.FRONTEND_URL}/update-account?token=${token}`;
    return link;
  }
}
