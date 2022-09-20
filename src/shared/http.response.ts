import { Response } from "express";

enum HttpStatus {
  OK = 200,
  Created = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  Ok(res: Response, data?: any) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      msg: "* @apiSuccess",
      data,
    });
  }
  Created(res: Response, data?: any) {
    return res.status(HttpStatus.Created).json({
      status: HttpStatus.Created,
      msg: "* @apiSuccess",
      data,
    });
  }

  NotFound(res: Response, error?: any) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      msg: "* @apiError",
      error: error.message,
    });
  }
  BadRequest(res: Response, error?: any) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      msg: "* @apiError",
      error: error.message,
    });
  }

  Error(res: Response, error?: any) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      msg: "* @apiError",
      error: error.message,
    });
  }
}
