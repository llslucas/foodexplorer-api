import { Router } from "express";
import FavoritesController from "../controllers/FavoritesController.js";
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js';

const favoritosRouter = Router();
const favoritosController = new FavoritesController();

favoritosRouter.post('/:id', ensureAuthenticated,  favoritosController.toogle);

export default favoritosRouter;
