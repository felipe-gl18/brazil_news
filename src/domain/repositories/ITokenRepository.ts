export interface ITokenRepository {
  save(token: string, userId: string, expiresAt: Date): Promise<void>;
  findByToken(token: string): Promise<{
    name: string;
    email: string;
    deliveryTime: Date;
    timezone: string;
    topics: string[];
  } | null>;
  deleteByToken(token: string): Promise<void>;
}
