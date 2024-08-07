import Router from 'express';
import PratosController from '../controllers/PratosController.js';
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js';
import verifyUserAuthorization from '../middlewares/verifyUserAuthorization.js';
import multer from 'multer';
import { MULTER } from '../configs/upload.js';
const upload = multer(MULTER);

const pratosRouter = Router();
const pratosController = new PratosController();

pratosRouter.use(ensureAuthenticated);

pratosRouter.post('/', verifyUserAuthorization("admin"),  pratosController.create);
pratosRouter.patch('/image/:id', verifyUserAuthorization("admin"), upload.single("image"), pratosController.updateImg);
pratosRouter.patch('/:id', verifyUserAuthorization("admin"), pratosController.update);
pratosRouter.delete('/:id', verifyUserAuthorization("admin"), pratosController.delete);
pratosRouter.get('/', pratosController.index);
pratosRouter.get('/categories', pratosController.getCategories);
pratosRouter.get('/:id', pratosController.get);

export default pratosRouter;
