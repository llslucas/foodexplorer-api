import Router from 'express';
import PratosController from '../controllers/PratosController.js';
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js';

const pratosRouter = Router();
const pratosController = new PratosController();

pratosRouter.post('/', ensureAuthenticated,  pratosController.create);
pratosRouter.patch('/:id', ensureAuthenticated, pratosController.update);
pratosRouter.delete('/:id', ensureAuthenticated, pratosController.delete);
pratosRouter.get('/', ensureAuthenticated, pratosController.index);
pratosRouter.get('/:id', ensureAuthenticated, pratosController.get);

export default pratosRouter;
