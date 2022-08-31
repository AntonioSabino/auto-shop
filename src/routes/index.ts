import * as express from 'express';
import CarRoute from './CarRoute';
import MotorcycleRoute from './MotorcycleRoute';

const router = express.Router();

router.use('/cars', CarRoute);
router.use('/motorcycles', MotorcycleRoute);

export default router;