import express, { Request, Response } from "express";
import dotenv from "dotenv"
import routeLoader from "./services/route.service";
import cors from "cors";
dotenv.config()
console.log(process.env)

class App {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT;
    this.app.use(express.json());
    this.app.use(cors());
    routeLoader(this.app);

    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'Failed',
        message: 'Not found!'
      });
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App start in port ${this.port}`)
    });
  }
}

const app = new App();
app.listen();