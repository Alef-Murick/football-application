import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User  from '../database/models/User';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste do endpoint /login', () => {
  let chaiHttp: Response;
  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves({
        dataValues: {
          email: 'admin@admin.com',
          id: 1,
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
          role: 'admin',
          username: 'Admin',
        }
      } as User);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Se login é feito com sucesso', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin",
    });

    expect(response.status).to.be.equal(200);
  });

  it('Se retorna erro caso não receba o email', async () => {
    const response = await chai.request(app).post('/login').send({
      "password": "secret_admin",
    });
    expect(response.body).to.be.deep.equal({ "message:": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('Se retorna erro caso não receba o password', async () => {
    const response = await chai.request(app).post('/login').send({
      "email:": "admin@admin.com",
    });
    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('Se retorna erro caso email seja inválido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "askjdkas",
      "password": "secret_admin"
    })
    expect(response.body).to.be.deep.equal({ "message": "Incorret email or password" });
    expect(response.status).to.be.equal(401);
  })

  it('Se retorna erro caso o password seja inválido', async () => {
    const response = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "aa",
    })
    expect(response.body).to.be.deep.equal({ "message": "Incorret email or password" });
    expect(response.status).to.be.equal(401);
  });
});

describe('Teste do endpoint /login/validate', async () => {
  let chaiHttp: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findByPk")
      .resolves({
        dataValues: {
          email: 'admin@admin.com',
          id: 1,
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
          role: 'admin',
          username: 'Admin',
        }
      } as User);
  });

  afterEach(() => {
    (User.findByPk as sinon.SinonStub).restore();
  });

  it('Se é possível validar o token de acesso', async () => {
    const token = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin",
    });

    const response = await
      chai.request(app).get('/login/validate').set('authorization', token.body.token).send();

    expect(response.body).to.be.deep.equal({ "role": "admin" });
    expect(response.status).to.be.equal(200);
  });

  it('Se retorna erro caso o token seja inválido', async () => {
    const response = await chai.request(app).get('/login/validate').set('authorization',
      "alksdjalskjdaslkjdaslkda.oasdaosjdhasda.dalsdlaskjdakj").send();

    expect(response.body).to.be.deep.equal({ "message": "Token must be a valid token" });
    expect(response.status).to.be.equal(401);
  });
});
