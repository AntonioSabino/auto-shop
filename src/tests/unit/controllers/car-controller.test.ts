import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock, carByIdMock, carsMock } from '../mocks/CarsMock';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'read').resolves(carsMock);
    sinon.stub(carService, 'readOne').resolves(carByIdMock);
    res.json = sinon.stub().returns(res);
    res.status = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('inserir um carro', () => {
    it('carro inserido com sucesso', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('listar todos os carros', () => {
    it('carros listados com sucesso', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('filtrar um carro pelo id', () => {
    it('id não encontrado', async () => {
      req.params = { id: '630e92d0b9f5d9f887496895' };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carByIdMock)).to.be.true;
    });
  });
});