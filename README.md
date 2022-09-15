# Projeto Auto Car Shop!

Neste projeto, aplico os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos. Isso será feito utilizando o banco de dados `MongoDB`, `Mongoose`, `TypeScript`, `NodeJS`, `Express`, `JOI` e `Zod`.

# Orientações

<strong>🛠 Testes</strong>

Para executar os testes localmente, digite no terminal o comando `npm test`.

<details>
  <summary>
    <strong> 🐳 Como subir o banco do MongoDB usando Docker</strong>
  </summary><br>

  Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker (necessário ter o Docker instalado), é só seguir os passos a seguir:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-conteiner> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```

</details>

<details>
  <summary>
    <strong>🐳 Rodando no Docker vs Localmente</strong>
  </summary><br>

  ## Docker

  > Rode os serviços `node` e `mongodb` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mongo` se estiver usando localmente na porta padrão (`27017`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
  - A partir daqui você pode rodar o container `car_shop` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it car_shop bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  
  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ## Localmente

  > Instale as dependências [**Caso existam**] com `npm install`

</details>

# Requisitos

### 01 - Endpoint `/cars` onde é possível cadastrar um novo carro

<details>
  <summary>É verificado se:</summary>

  - A rota retorna erro `400` caso a requisição receba um objeto vazio;
  - A rota retorna erro `400` ao tentar criar um carro com quantidade de assentos inferior a 2;
  - A rota retorna erro `400` ao tentar criar um carro com quantidade de portas inferior a 2;
  - A rota retorna erro `400` ao tentar criar um carro sem `model`, `year`, `color` e `buyValue`;
  - A rota retorna erro `400` ao tentar criar um carro sem `doorsQty` e `seatsQty`;
  - Não é possível criar um carro se os atributos `model`, `year`, `color`, `buyValue`, `doorsQty` e `seatsQty` estiverem com tipos errados;
  - É possível criar um carro se todos os parâmetros forem passados corretamente;
  - A API responde com status http `201` e o seguinte body:
  ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  ```

</details>

### 02 - Endpoint `/cars` onde é possível listar todos os carros registrados

<details>
  <summary>É verificado se:</summary>

  - É possível listar os carros com sucesso;
  - Haverá retorno de uma lista vazia se não houver carros;
  - A API responderá com status http `200` em caso de sucesso.
  
</details>

### 03 - Endpoint `/cars/id` onde é possível listar um único carro através do seu id

<details>
  <summary>É verificado se:</summary>

  - É possível listar um carro com sucesso através do id;
  - A API responderá com status http `200` em caso de sucesso;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  
</details>

### 04 - Endpoint `/cars/id`, onde é possível atualizar o registro de um carro através do seu id

<details>
  <summary>É verificado se:</summary>

  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - É disparado o erro `400` caso o `body` esteja vazio;
  - Um carro é atualizado com sucesso;
  - A API responderá com status http `200` e o seguinte body, em caso de sucesso:
  ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Fiat Uno",
    year: 1963,
    color: "blue",
    buyValue: 3500,
    seatsQty: 4,
    doorsQty: 4
  ```
  
</details>

### 05 - Endpoint `/cars/id` para excluir os registros de um carro

<details>
  <summary>É verificado se:</summary>

  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - Um carro é removido com sucesso;
  - A API deve responder com status http `204` sem body;
  
</details>

### 6 - Endpoint `/motorcycles` onde é possível cadastrar uma nova moto

<details>
  <summary>É verificado se:</summary>

  - A rota retorna erro `400` caso a requisição receba um objeto vazio;
  - A rota retorna erro `400` ao tentar criar uma moto com `category` diferente de `Street`, `Custom` ou `Trail`;
  - A rota retorna erro `400` ao tentar criar uma moto com `category` diferente de `string`;
  - A rota retorna erro `400` ao tentar criar uma moto com `engineCapacity` menor ou igual a zero;
  - A rota retorna erro `400` ao tentar criar uma moto com `engineCapacity` maior que 2500;
  - A rota retorna erro `400` ao tentar criar um moto sem `model`, `year`, `color` e `buyValue`;
  - A rota retorna erro `400` ao tentar criar um moto sem `category` e `engineCapacity`;
  - Não é possível criar uma moto se os atributos `model`, `year`, `color`, `buyValue`, `category` e `engineCapacity` estiverem com tipos errados;
  - É possível criar uma moto se todos os parâmetros forem passados corretamente;
  - A API responderá com status http `201` e o seguinte body:
  ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  ```
  
</details>

### 7 - Endpoint `/motorcycles` onde é possível listar todas as motos registradas

<details>
  <summary>É verificado se:</summary>

  - É possível listar as motos com sucesso;
  - Haverá retorno de uma lista vazia se não houver motos;
  - A API responderá com status http `200`.
  
</details>

### 8 - Endpoint `/motorcycles/id` onde é possível listar uma única moto através do seu id

<details>
  <summary>É verificado se:</summary>

  - É possível listar uma moto com sucesso através do id;
  - A API responderá com status http `200` em caso de sucesso;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  
</details>

### 9 - Endpoint `/motorcycles/id` onde é possível atualizar o registro de uma moto através do seu id

<details>
  <summary>É verificado se:</summary>

  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - É disparado o erro `400` caso o `body` esteja vazio;
  - Una moto é atualizada com sucesso;
  - A API responderá com status http `200` e o seguinte body, em caso de sucesso:
  ```JSON
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "black",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  ```

</details>

### 10 - Endpoint `/motorcycles/id` para excluir os registros de uma moto

<details>
  <summary>É verificado se:</summary>

  - É disparado o erro `404` `Object not found` caso o id possua 24 caracteres, mas seja inválido;
  - É disparado o erro `400` `Id must have 24 hexadecimal characters` caso o id possua menos que 24 caracteres;
  - Uma moto é removida com sucesso;
  - A API responderá com status http `204` sem body, em caso de sucesso;

</details>
