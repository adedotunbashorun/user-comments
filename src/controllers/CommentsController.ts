import { Request, Response } from "express";
import { Controller,  Get, Put, Post, Delete } from "@overnightjs/core";
import { AbstractController } from "./AbstractController";
import { CommentRepository as Repository } from "../repositories/CommentsRepository";

@Controller("api/comments")
export class CommentsController extends AbstractController {
  constructor() {
    super(new Repository());
  }
}