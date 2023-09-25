import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { INTERNAL_SERVER_ERROR } from "../services/response.service";
import { send } from "../services/response.service";
const prisma = new PrismaClient();

export default class UserController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      const response = {
        'status': 'Success',
        'data': users
      }
      return res.status(200).json(response);
    } catch (err) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }

  public static getById = async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findFirst({
        where: { id: req.params.id }
      });
      const response = {
        'status': 'Success',
        'data': user
      }
      return res.status(200).json(response);
    } catch (err) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }

  public static store = async (req: Request, res: Response) => {
    try {
      await prisma.user.create({
        data: {
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          birthday: req.body.birthday,
          location: req.body.location,
          timezone: req.body.timezone

        }
      });
      const user = await prisma.user.findFirst({
        where: {
          username: req.body.username
        }
      });
      const response = {
        'status': 'Success',
        'data': user
      }
      return res.status(200).json(response);
    } catch (err: any) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }

  public static update = async (req: Request, res: Response) => {
    try {
      await prisma.user.update({
        where: { id: req.params.id },
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          birthday: req.body.birthday,
          location: req.body.location,
          timezone: req.body.timezone
        }
      });
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.id
        }
      });
      const response = {
        'status': 'Success',
        'data': user
      }
      return res.status(200).json(response);
    } catch (err) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }

  public static delete = async (req: Request, res: Response) => {
    try {
      await prisma.user.delete({
        where: {
          id: req.params.id
        }
      });
      const response = {
        'status': 'Success',
        'message': 'User deleted successfuly'
      }
      return res.status(200).json(response);
    } catch (err) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  }
}