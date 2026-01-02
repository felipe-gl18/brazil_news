import { NextFunction, Request, Response } from "express";
import { UpdateUser } from "../../../application/useCases/UpdateUser";
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUser) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateUser.execute(req.params.id, req.body);
      return res
        .status(200)
        .send({ success: true, message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}
