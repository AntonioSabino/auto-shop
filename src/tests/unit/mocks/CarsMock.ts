import { ICar } from '../../../interfaces/ICar';

const carMock: ICar = {
  model: 'Nissan March',
  year: 2017,
  color: 'cinza',
  buyValue: 41435,
  seatsQty: 5,
  doorsQty: 4,
};

const carByIdMock: ICar & { _id: string } = {
  _id: '630e92d0b9f5d9f887496895',
  model: 'Nissan March',
  year: 2017,
  color: 'cinza',
  buyValue: 41435,
  seatsQty: 5,
  doorsQty: 4,
};

const carsMock: ICar[] & { _id: string }[] = [
  {
    _id: '630e92d0b9f5d9f887496895',
    model: 'Nissan March',
    year: 2017,
    color: 'cinza',
    buyValue: 41435,
    seatsQty: 5,
    doorsQty: 4,
  },
  {
    _id: '66as1li6437035d94maa5240',
    model: 'Nissan Versa',
    year: 2017,
    color: 'preto',
    buyValue: 47500,
    seatsQty: 5,
    doorsQty: 4,
  },
  {
    _id: '03sa1bi6431035d94noa0044',
    model: 'Nissan Kicks',
    year: 2017,
    color: 'vermelho',
    buyValue: 86763,
    seatsQty: 5,
    doorsQty: 4,
  },
];

export { carMock, carByIdMock, carsMock };