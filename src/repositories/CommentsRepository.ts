import { AbstractRepository } from "./AbstractRepository";

export class CommentRepository extends AbstractRepository {
  constructor() {
    super("Comment");
  }
}