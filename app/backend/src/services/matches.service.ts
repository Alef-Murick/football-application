import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";
import Team from "../database/models/Team";
import { validateToken } from "../utils/jwt";
import TeamsService from "./teams.service";

export default class MatchesService {
  teamService = new TeamsService();
  async findAllMatches(): Promise<{ status: number, message: iMatch[] }> {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
        },
        {
          model: Team,
          as: 'teamAway',
        },

      ],
    });
    return { status: 200, message: matches}
  }

  async findLiveMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
    const matches = await Match.findAll({
      where: { inProgress: true },
      include: [
        {
          model: Team,
          as: 'teamHome',
        },
        {
          model: Team,
          as: 'teamAway',
        },

      ],})
      return { status: 200, message: matches }
  }

async findFinishedMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
  const matches = await Match.findAll({
    where: { inProgress: false },
    include: [
      {
        model: Team,
        as: 'teamHome',
      },
      {
        model: Team,
        as: 'teamAway',
      },

    ],})
    return { status: 200, message: matches }
}
  async createMatch(
    authorization: string,
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: iMatch,
    awayTeamGoals: iMatch,
  ): Promise<{ status: number, message: string | iMatch }> {
    const { status } = await validateToken(authorization)
    
      if (status === 200) {      
      if (homeTeam === awayTeam) {
        return { status: 422, message: 'It is not possible to create a match with two equal teams' }
      }
    
      const validateTeams = await this.teamService.getTeamByName(homeTeam, awayTeam)
      const match = await Match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true })
      // console.log('match>>>>>>>>>>>>><<<<<<<<<<<<<<<<', match);
    
    
      return { status: 201, message: match }
      }
      return { status: 401, message: 'Token must be a valid token'};
  }

  async updateMatch(id: string): Promise <void> {
    const match = await Match.update({ inProgress: false }, { where: { id } });
  }


  static async updateLiveMatch(
    id: string,
    homeTeamGoals: iMatch,
    awayTeamGoals: iMatch,
  ): Promise<void> {    
    if (homeTeamGoals) {
      await Match.update({ homeTeamGoals }, { where: { id } });
    }
    if (awayTeamGoals) {
      await Match.update({ awayTeamGoals }, { where: { id } });
    }
  }
}

