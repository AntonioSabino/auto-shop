import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const newMotorcycle = await this._service.create(req.body);
    return res.status(201).json(newMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const allMotorcycles = await this._service.read();
    return res.status(200).json(allMotorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const motorcycleById = await this._service.readOne(id);    
    return res.status(200).json(motorcycleById);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const updatedMotorcycle = await this._service.update(id, req.body);    
    return res.status(200).json(updatedMotorcycle);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    const { id } = req.params;
    const deletedMotorcycle = await this._service.delete(id);    
    return res.status(204).json(deletedMotorcycle);
  }
}
