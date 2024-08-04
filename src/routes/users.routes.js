import Router from 'express';

import UsersController from '../controllers/UsersController.js';
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post("/", usersController.create);
usersRouter.put("/", ensureAuthenticated, usersController.update);

export default usersRouter;
