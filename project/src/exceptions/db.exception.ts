import { HttpException, HttpStatus } from "@nestjs/common";


export default class DBException extends HttpException {
  constructor() {
    super("DB_ERROR", HttpStatus.BAD_GATEWAY);
  }
}