import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { expect } from 'chai';
import { carMock, carByIdMock, carsMock } from '../mocks/CarsMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carByIdMock);
    sinon.stub(Model, 'findOne').resolves(carByIdMock);
    sinon.stub(Model, 'find').resolves(carsMock);
  });

  after(() => {
    sinon.restore();
  });

  describe('inserir um carro', () => {
    it('carro inserido com sucesso', async () => {
      const carFrame = await carModel.create(carMock);
      expect(carFrame).to.be.deep.equal(carByIdMock);
    });
  });

  describe('listar todos os carros', () => {
    it('carros listados com sucesso', async () => {
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal(carsMock);
    });
  });

  describe('filtrar um carro pelo id', () => {
    it('id não encontrado', async () => {
      try {
        await carModel.readOne('00as1li4031035d93maa5242');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });

    it('carro encontrado com sucesso', async () => {
      const carById = await carModel.readOne('630e92d0b9f5d9f887496895');
      expect(carById).to.be.deep.equal(carByIdMock);
    });
  });
});