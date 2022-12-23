import { Router } from 'express';
import 'express-async-errors';
import loginRouter from './login.router';
import teamsRouter from './teams.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;