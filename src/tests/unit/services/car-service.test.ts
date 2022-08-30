import * as sinon from 'sinon';
import { expect } from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carByIdMock, carsMock } from '../mocks/CarsMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carByIdMock);
    sinon.stub(carModel, 'read').resolves(carsMock);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(null)
      .onCall(1)
      .resolves(carByIdMock);
  });
  after(() => {
    sinon.restore();
  });
  describe('inserir um carro', () => {
    it('carro não inserido', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('carro inserido com sucesso', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carByIdMock);
    });
  });

  describe('listar todos os carros', () => {
    it('carros listados com sucesso', async () => {
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(carsMock);
    });
  });

  describe('filtrar um carro pelo id', () => {
    it('id não encontrado', async () => {
      try {
        await carService.readOne('630e92d0b9f5d9f887496895');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    });

    it('carro encontrado com sucesso', async () => {
      const car = await carService.readOne('630e92d0b9f5d9f887496895');
      expect(car).to.be.deep.equal(carByIdMock);
    });
  });
});