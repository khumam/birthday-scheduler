import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PostValidation = async (req: Request, res: Response, next: NextFunction) => {
  let errors = []
  if (req.body.username.length < 6 || req.body.username.length > 48) {
    errors.push('Username length should be not less than 6 chars and not more than 48 chars.');
  }
  if (req.body.first_name.length < 5 || req.body.first_name.length > 44) {
    errors.push('First name length should be not less than 5 chars and not more than 44 chars.');
  }
  if (req.body.last_name.length > 55) {
    errors.push('Last name length should be not more than 55 chars.');
  }
  if (await prisma.user.findFirst({ where: { username: req.body.username } }) != null) {
    errors.push('Username exists');
  }

  if (errors.length > 0) {
    const response = {
      status: 'Failed',
      message: errors
    }
    return res.status(400).json(response);
  }

  next();
};

const UpdateValidation = (req: Request, res: Response, next: NextFunction) => {
  let errors = []
  if (req.body.username) {
    errors.push('Username should be not updated.');
  }
  if (req.body.first_name.length < 5 || req.body.first_name.length > 44) {
    errors.push('First name length should be not less than 5 chars and not more than 44 chars.');
  }
  if (req.body.last_name.length > 55) {
    errors.push('Last name length should be not more than 55 chars.');
  }

  if (errors.length > 0) {
    const response = {
      status: 'Failed',
      message: errors
    }
    return res.status(400).json(response);
  }

  next();
};

const UserValidation = async (req: Request, res: Response, next: NextFunction) => {
  const user = await prisma.user.findFirst({ where: { id: req.params.id } })
  if (user == null) {
    const response = {
      status: 'Failed',
      message: 'User does not exists'
    }
    return res.status(400).json(response);
  }
  next();
}

export {
  PostValidation,
  UpdateValidation,
  UserValidation
};