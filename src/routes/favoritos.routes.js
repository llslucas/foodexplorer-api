import { Router } from "express";
import FavoritesController from "../controllers/FavoritesController.js";
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js';
import verifyUserAuthorization from "../middlewares/verifyUserAuthorization.js";

const favoritosRouter = Router();
const favoritosController = new FavoritesController();

favoritosRouter.use(ensureAuthenticated);

favoritosRouter.post('/:id', favoritosController.toogle);

export default favoritosRouter;
