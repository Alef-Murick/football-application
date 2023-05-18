import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import matchesMock from './mocks/matches.mock';
import Match from '../database/models/Match';
import loginMock from './mocks/login.mock';

const { allMatches } = matchesMock;

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota /matches', () => {
  beforeEach(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(matchesMock.allMatches as unknown as Match[]);
    
    sinon
    .stub(Match, 'create')
      .resolves({
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 3,
        "awayTeamGoals": 1,
        "inProgress": true,
      } as Match);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
  });

  it('Se retorna todas as partidas com sucesso', async () => {
    const result = await chai.request(app)
      .get('/matches');

    expect(result.status).to.be.deep.equal(200);
    expect(result.body).to.be.deep.equal(matchesMock.allMatches);
  });


  it('Se consegue registrar uma nova partida com sucesso', async () => {
    const token = await chai.request(app)
      .post('/login')
      .send(loginMock.adminLogin);
    
    const result = await chai.request(app)
      .post('/matches')
      .set('authorization', token.body.token)
      .send({
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 3,
        "awayTeamGoals": 1,
        "inProgress": true,
      })
    
    expect(result.status).to.be.deep.equal(201);
    expect(result.body).to.be.deep.equal({
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 3,
      "awayTeamGoals": 1,
      "inProgress": true,
    })
  });

})
