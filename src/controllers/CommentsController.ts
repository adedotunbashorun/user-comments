import { Request, Response } from "express";
import { Controller,  Get } from "@overnightjs/core";
import { AbstractController } from "./AbstractController";
import { CommentRepository as Repository } from "../repositories/CommentsRepository";

@Controller("api/comments")
export class CommentsController extends AbstractController {
  constructor() {
    super(new Repository());
  }

  @Get("/user/:userId")
  public async userComments(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.repository.findBy('user', req.params.userId);
      res.status(200).send({ success: true, data });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }
}