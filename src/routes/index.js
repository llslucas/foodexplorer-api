import Router from 'express'

import usersRouter from './users.routes.js';
import sessionsRouter from './sessions.routes.js';
import pratosRouter from './pratos.routes.js';
import favoritosRouter from './favoritos.routes.js';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/pratos', pratosRouter);
routes.use('/favoritos', favoritosRouter);

export default routes;