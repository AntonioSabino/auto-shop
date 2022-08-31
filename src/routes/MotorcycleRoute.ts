import { Router } from 'express';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleController from '../controllers/MotorcycleController';

const route = Router();

const Motorcycle = new MotorcycleModel();
const service = new MotorcycleService(Motorcycle);
const controller = new MotorcycleController(service);

route.post('/', (req, res) => controller.create(req, res));
route.get('/', (req, res) => controller.read(req, res));
route.get('/:id', (req, res) => controller.readOne(req, res));
route.put('/:id', (req, res) => controller.update(req, res));
route.delete('/:id', (req, res) => controller.delete(req, res));

export default route;