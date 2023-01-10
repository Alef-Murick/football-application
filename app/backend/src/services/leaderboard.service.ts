import MatchesService from "./matches.service";
import TeamsService from "./teams.service";

export default class LeaderboardService {
  async getLeaderboards(path: string) {
    const matchesService = new MatchesService()
    const teamService = new TeamsService()
    const matches = await matchesService.findFinishedMatches();
    const teams = await teamService.getAllTeams();

    const leaderboard = teams.map((team) => {
      const table = {
        name: team.teamName,
        totalVictories: 0,
        totalDraws: 0,
        totalPoints: 0,
        totalGames: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      }
      // console.log('MATCHES MESSAGE >>>>>', matches.message);      
      if (typeof matches.message !== "string") {
        
        if (path === '/home') {          
          matches.message.forEach(async (match) => {
            if (team.id === match.homeTeam) {
              
              if (match.homeTeamGoals > match.awayTeamGoals) {
                table.totalVictories += 1;
                table.totalPoints += 3;
              }
              if (match.homeTeamGoals < match.awayTeamGoals) {
                table.totalLosses += 1;
              }
              if (match.homeTeamGoals === match.awayTeamGoals) {
                table.totalDraws += 1;
                table.totalPoints += 1;
              }
              table.totalGames += 1;
              table.goalsFavor += match.homeTeamGoals;
              table.goalsOwn += match.awayTeamGoals;
              table.goalsBalance = table.goalsFavor - table.goalsOwn;
              table.efficiency = Number(((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(2))
            }
          });
        }

        if (path === '/away') { 
          matches.message.forEach(async (match) => {
            if (team.id === match.awayTeam) {
              
              if (match.awayTeamGoals > match.homeTeamGoals) {
                table.totalVictories += 1;
                table.totalPoints += 3;
              }
              if (match.awayTeamGoals < match.homeTeamGoals) {
                table.totalLosses += 1;
              }
              if (match.awayTeamGoals === match.homeTeamGoals) {
                table.totalDraws += 1;
                table.totalPoints += 1;
              }
              table.totalGames += 1;
              table.goalsFavor += match.awayTeamGoals;
              table.goalsOwn += match.homeTeamGoals;
              table.goalsBalance = table.goalsFavor - table.goalsOwn;
              table.efficiency = Number(((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(2))
            }
          });
        }

        if (path === '/') {
          matches.message.forEach(async (match) => {
            if (team.id === match.homeTeam) {              
              if (match.homeTeamGoals > match.awayTeamGoals) {
                table.totalVictories += 1;
                table.totalPoints += 3;
              }
              if (match.homeTeamGoals < match.awayTeamGoals) {
                table.totalLosses += 1;
              }
              if (match.homeTeamGoals === match.awayTeamGoals) {
                table.totalDraws += 1;
                table.totalPoints += 1;
              }
              table.totalGames += 1;
              table.goalsFavor += match.homeTeamGoals;
              table.goalsOwn += match.awayTeamGoals;
              table.goalsBalance = table.goalsFavor - table.goalsOwn;
              table.efficiency = Number(((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(2))
            }
            if (team.id === match.awayTeam) {
              
              if (match.awayTeamGoals > match.homeTeamGoals) {
                table.totalVictories += 1;
                table.totalPoints += 3;
              }
              if (match.awayTeamGoals < match.homeTeamGoals) {
                table.totalLosses += 1;
              }
              if (match.awayTeamGoals === match.homeTeamGoals) {
                table.totalDraws += 1;
                table.totalPoints += 1;
              }
              table.totalGames += 1;
              table.goalsFavor += match.awayTeamGoals;
              table.goalsOwn += match.homeTeamGoals;
              table.goalsBalance = table.goalsFavor - table.goalsOwn;
              table.efficiency = Number(((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(2))
            }
          });
        }
      }
        // console.log('TABLE FILLED?3333333333', table);
      return table;
    });
    // console.log('leaderboard return', leaderboard);
    return leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    );
  }
};