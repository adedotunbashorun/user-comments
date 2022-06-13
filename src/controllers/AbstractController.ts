import { Request, Response } from "express";
import { Get, Delete, Post, Put } from "@overnightjs/core";
import { IAbstract } from "repositories/IAbstract";

export class AbstractController {
  protected repository: IAbstract;

  constructor(repository: any) {
    this.repository = repository;
  }

  @Get("")
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.repository.findAll();
      res.status(200).send({ success: true, data });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Post("create")
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const data = await this.repository.createNew(payload);
      res.status(200).send({ success: true, data, msg: "record created successfully" });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Get("show/:id")
  public async show(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.repository.findById(req.params.id);
      res.status(200).send({ success: true, data });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Put("update/:id")
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.repository.updateData(req.params.id, req.body);

      res.status(200).json({ success: true, data, msg: "record updated successfully" });
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Delete("destroy/:id")
  public async destroy(req: Request, res: Response): Promise<void> {
    try {
      this.repository.forceDelete(req.params.id);
      res.status(200).send({ success: true, msg: "record deleted successfull"});
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }

  @Delete("delete/:id")
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      this.repository.softDelete(req.params.id);
      res.status(200).send({ success: true, msg: "record deleted successfull"});
    } catch (error: any) {
      res.status(401).json({ success: false, error, msg: error.message });
    }
  }
}