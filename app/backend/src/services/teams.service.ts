import { iTeam } from "../interfaces/iTeam";
import Team from "../database/models/Team"
import { iMatch } from "../interfaces/iMatch";

export default class TeamsService {
  async getAllTeams(): Promise<iTeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  async getTeamById(id: number): Promise<{status: number, message: string | iTeam}> {
    const team = await Team.findByPk(id)
    if (team) {
      return { status: 200, message: team };
    }
    return {status: 404, message: 'id not found'}
  }

  async getTeamByName(homeTeam: string, awayTeam: string) {
    const team1 = await Team.findByPk(homeTeam);
    const team2 = await Team.findByPk(awayTeam);

    if (!team1 || !team2) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    return {status: 201, message: 'Valid team'}
  }
}

// console.log('teams in service', teams);
// console.log('team by id in service', team);