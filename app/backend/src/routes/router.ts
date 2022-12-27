import { Router } from 'express';
import 'express-async-errors';
import loginRouter from './login.router';
import teamsRouter from './teams.router';
import matchesRouter from './matches.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;