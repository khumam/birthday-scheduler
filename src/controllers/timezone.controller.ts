import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, SUCCESS } from "../services/response.service";
import { send } from "../services/response.service";
import momentTimezone from "moment-timezone";

export default class TimezoneController {
  public static getListTimezone = async (req: Request, res: Response) => {
    try {
      const response = {
        status: 'Success',
        data: momentTimezone.tz.names()
      };
      return res.status(SUCCESS).json(response);
    } catch (err: any) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }
}