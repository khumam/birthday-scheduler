import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, SUCCESS } from "../services/response.service";
import { send } from "../services/response.service";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { sendEmail } from "../services/email.service";
const prisma = new PrismaClient({
  log: ['query'],
});

export default class SchedulerController {
  public static process = async (req: Request, res: Response) => {
    try {
      const target = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD HH:mm:ss');
      const timezones = momentTimezone.tz.names();
      const matchingTimezones = [];
      const matchingMonth = [];
      const matchingDay = [];
      for (const timezone of timezones) {
        const momentInTimezone = momentTimezone.tz(target.format(), timezone);
        if (momentInTimezone.format('HH:mm:ss') == '09:00:00') {
          matchingTimezones.push(timezone);
          matchingMonth.push(momentInTimezone.format('MM'));
          matchingDay.push(momentInTimezone.format('DD'));
        }
      }
      const userWhoBirthdayToday = await prisma.$queryRaw(Prisma.sql`SELECT * FROM User WHERE MONTH(birthday) IN (${Prisma.join(matchingMonth)}) AND DAY(birthday) IN (${Prisma.join(matchingDay)}) AND timezone IN (${Prisma.join(matchingTimezones)})`);

      (userWhoBirthdayToday as User[]).forEach(async (user: User) => {
        const sent = await sendEmail(user);
      });
      
      const response = {
        timezone: matchingTimezones,
        user: userWhoBirthdayToday
      }
      return res.status(SUCCESS).json(response);
    } catch (err: any) {
      return send(INTERNAL_SERVER_ERROR, err.message, res);
    }
  } 
}