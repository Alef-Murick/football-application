import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";
import Team from "../database/models/Team";
import { validateToken } from "../utils/jwt";
import TeamsService from "./teams.service";

export default class MatchesService {
  teamService = new TeamsService();

  public async findAllMatches(): Promise<{ status: number, message: iMatch[] }> {
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

  public async findLiveMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
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

  public async findFinishedMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
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
  public async createMatch(
    authorization: string,
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<{ status: number, message: string | iMatch }> {
    if (homeTeam === awayTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' }
    }
    
    const validateTeams = await this.teamService.getTeamByName(homeTeam, awayTeam)
    
    if (validateTeams.status === 201) {
      const token = await validateToken(authorization)
      if (token) {

        if (token.status === 200) {
          const match = await Match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true })
          return { status: 201, message: match }
        }
        return { status: token.status, message: token.message };
      }
    }
    return { status: validateTeams.status, message: validateTeams.message };
  }

  async updateMatch(id: string): Promise <void> {
    const match = await Match.update({ inProgress: false }, { where: { id } });
  }


 async updateLiveMatch(
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

