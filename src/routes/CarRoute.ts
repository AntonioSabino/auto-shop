import { Router } from 'express';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const route = Router();

const Car = new CarModel();
const service = new CarService(Car);
const controller = new CarController(service);

route.post('/', (req, res) => controller.create(req, res));
route.get('/', (req, res) => controller.read(req, res));
route.get('/:id', (req, res) => controller.readOne(req, res));
route.put('/:id', (req, res) => controller.update(req, res));
route.delete('/:id', (req, res) => controller.delete(req, res));

export default route;