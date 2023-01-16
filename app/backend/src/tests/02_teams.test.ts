import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

const Login = {
  email: "asdfas",
  password: "secret_admin",
}

const users = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
}

const teams = [
  { "id": 1, "teamName": "Avaí/Kindermann" },
  { "id": 2, "teamName": "Bahia" }
]

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota /teams', () => {
  beforeEach(async () => {
    sinon.
      stub(Team, 'findAll')
      .resolves(teams as Team[]);
  });

  it('Se retorna todos os times', async () => {
    const result = await chai.request(app).get('/teams');

    expect(result.body).to.be.deep.equal(teams);
    expect(result.status).to.be.equal(200);
  })

  it('Se retorna um time pelo id', async () => {
    const result = await chai.request(app).get('/teams/1');

    expect(result.body).to.be.deep.equal(teams[ 0 ]);
    expect(result.status).to.be.equal(200);
  })

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });
  
});








