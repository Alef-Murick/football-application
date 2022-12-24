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
}

// console.log('teams in service', teams);
// console.log('team by id in service', team);