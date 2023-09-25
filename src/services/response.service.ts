import { Response } from "express";

export const INTERNAL_SERVER_ERROR = 500;
export const BAD_REQUEST = 400;
export const NOT_FOUND = 404;
export const SUCCESS = 200;

export const send = (code: number, message: string, res: Response) => {
  const response = {
    'message': message
  }
  return res.status(code).json(response);
}