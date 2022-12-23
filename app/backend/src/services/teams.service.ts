import Team from "../database/models/Team"

export default class TeamsService {
    getAllTeams = () => {
      const teams = Team.findAll();
      return teams;
  }
}