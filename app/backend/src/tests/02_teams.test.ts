import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';

import teams from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota /teams', () => {
  beforeEach(async () => {
    sinon.
    stub(Team, 'findAll')
      .resolves(teams as Team[]);
    
    sinon.stub(Team, 'findByPk').resolves(teams[0] as Team);
  });
  
  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();

    (Team.findByPk as sinon.SinonStub).restore();
  });
  
  it('Se retorna todos os times', async () => {
    const result = await chai.request(app).get('/teams');
    
    expect(result.body).to.be.deep.equal(teams);
    expect(result.status).to.be.equal(200);
  })


  it('Se retorna um time pelo id', async () => {
    const result = await chai.request(app).get('/teams/1');
   
    expect(result.body).to.be.deep.equal(teams[0]);
    expect(result.status).to.be.equal(200);
  })
});








