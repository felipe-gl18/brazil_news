interface Request {
  name: string;
  email: string;
  whatsapp?: string;
  topics: string[];
}

export class CreateUser {}
