import { iTeam } from "../interfaces/iTeam";
import Team from "../database/models/Team"

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

  async getTeamByName(homeTeam: number, awayTeam: number) {
    const team1 = await Team.findByPk(homeTeam);
    const team2 = await Team.findByPk(awayTeam);

    if (team1 && team2) {
      return {status: 201, message: 'Valid team'}
    }
    return { status: 404, message: 'There is no team with such id!' };
  }
}