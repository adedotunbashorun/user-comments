import { Request, Response } from "express";
import { Controller,  Get, Put, Post, Delete } from "@overnightjs/core";
import { AbstractController } from "./AbstractController";
import { UserRepository as Repository } from "../repositories/UserRepository";
@Controller("api/users")
export class UserController extends AbstractController {
  constructor() {
    super(new Repository());
  }

  @Get("")
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.repository.findAll();
      res.status(200).send({ success: true, user });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Post("register")
  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.repository.createNew(req);

      res.status(200).json({ success: true, user, msg: "user created successfully!" });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Put("update/:userId")
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.repository.updateData(req.params.id, req.body);

      res.status(200).json({ success: true, user, msg: "user updated successfully" });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Get(":userId")
  public async findUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.repository.findById(req.params.userId);

      res.status(200).json({ success: true, user });

    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }
}