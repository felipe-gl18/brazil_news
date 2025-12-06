export interface CreateUserDTO {
  name: string;
  email: string;
  topics: string[];
  whatsapp?: string;
}
