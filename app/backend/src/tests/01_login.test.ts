import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/User';
import loginMock from './mocks/login.mock';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste do endpoint /login', () => {
  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(loginMock.adminLoginResponse as User);
  });

  afterEach(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Se login é feito com sucesso', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock.adminLogin);

    expect(response.status).to.be.equal(200);
  });

  it('Se retorna erro caso não receba o email', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock.missingEmail);
    
    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('Se retorna erro caso não receba o password', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock.missingPassword);
    
    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('Se retorna erro caso email seja inválido', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock.wrongEmail);
    
    expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" });
    expect(response.status).to.be.equal(401);
  });

  it('Se retorna erro caso o password seja inválido', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock.wrongPassword);
    
    expect(response.body).to.be.deep.equal({ "message": "Incorrect email or password" });
    expect(response.status).to.be.equal(401);
  });
});

describe('Teste do endpoint /login/validate', async () => {
  let chaiHttp: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findByPk")
      .resolves(loginMock.adminLoginResponse as User);
  });

  afterEach(() => {
    (User.findByPk as sinon.SinonStub).restore();
  });

  it('Se é possível validar o token de acesso', async () => {
    const token = await chai.request(app)
      .post('/login')
      .send(loginMock.adminLogin);

    const response = await
      chai.request(app)
        .get('/login/validate')
        .set('authorization', token.body.token)
        .send();

    expect(response.body).to.be.deep.equal({ "role": "admin" });
    expect(response.status).to.be.equal(200);
  });

  it('Se retorna erro caso o token seja inválido', async () => {
    const response = await chai.request(app).
      get('/login/validate')
      .set('authorization',
        "alksdjalskjdaslkjdaslkda.oasdaosjdhasda.dalsdlaskjdakj")
      .send();

    expect(response.body).to.be.deep.equal({ "message": "Token must be a valid token" });
    expect(response.status).to.be.equal(401);
  });
});
