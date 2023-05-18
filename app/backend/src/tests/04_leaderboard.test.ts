// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import App from '../app';
// import leaderboard from './mocks/leaderboard.mock';

// chai.use(chaiHttp);

// const { app } = new App();
// const { expect } = chai;

// describe('Testando a rota /leaderboard', () => {
//   it('Se retorna todo o leaderboard com sucesso', async () => {
//     const result = await chai.request(app)
//       .get('/leaderboard');

//     expect(result.status).to.be.deep.equal(200);
//     expect(result.body).to.be.deep.equal(leaderboard.fullLeaderboard);
//   });

//   it('Se retorna o leaderboard/home com sucesso', async () => {
//     const result = await chai.request(app)
//       .get('/leaderboard/home');

//     expect(result.status).to.be.deep.equal(200);
//     expect(result.body).to.be.deep.equal(leaderboard.homeLeaderboard);
//   });

//   it('Se retorna o leaderboard/away com sucesso', async () => {
//     const result = await chai.request(app)
//       .get('/leaderboard/away');

//     expect(result.status).to.be.deep.equal(200);
//     expect(result.body).to.be.deep.equal(leaderboard.awayLeaderboard)
//   });
// });