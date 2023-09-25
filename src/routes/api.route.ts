import { Router } from "express";
import UserController from "../controllers/user.controller";
import { PostValidation, UpdateValidation, UserValidation } from "../requests/user.request";
import TimezoneController from "../controllers/timezone.controller";
import SchedulerController from "../controllers/scheduler.controller";

const apiRoute = Router();

apiRoute.get('/user', UserController.getAll);
apiRoute.get('/user/:id', UserValidation, UserController.getById);
apiRoute.post('/user/store', PostValidation, UserController.store);
apiRoute.put('/user/update/:id', UpdateValidation, UserValidation, UserController.update);
apiRoute.delete('/user/delete/:id', UserValidation, UserController.delete);

apiRoute.get('/timezone', TimezoneController.getListTimezone);
apiRoute.post('/scheduler', SchedulerController.process);

export default apiRoute;