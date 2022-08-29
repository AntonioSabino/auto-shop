import * as express from 'express';
import CarRoute from './CarRoute';

const router = express.Router();

router.use('/cars', CarRoute);

export default router;