import MatchesService from "./matches.service";
import TeamsService from "./teams.service";

export default class LeaderboardService {
  async getLeaderboards() {
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

      if (typeof matches.message !== "string") {

        matches.message.forEach(async (match) => {
          const homeTeam = await teamService.getTeamById(match.homeTeam);
          // const awayTeam = await this.teamService.getTeamById(match.awayTeam);
          if (typeof homeTeam.message !== "string") {
            if (team.teamName === homeTeam.message.teamName) {
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
          }
        });
      }
      return table;
    });
    return leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
    );
  }
};