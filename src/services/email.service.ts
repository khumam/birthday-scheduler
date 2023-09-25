import { User } from "@prisma/client";
import axios from "axios";
import { produceMessage } from "./rabbitmq.service";
const BASE_URL = "https://email-service.digitalenvision.com.au/send-email";

export const sendEmail = async (user: User) => {
  const body = {
    email: user.email,
    message: `Hi ${user.first_name} ${user.last_name} it is your birthday!`
  };
  const res = await axios.post(BASE_URL, body).catch(async (err) => await produceMessage(user));
}