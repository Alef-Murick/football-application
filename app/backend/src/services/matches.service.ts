import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";
import Team from "../database/models/Team";
import { validateToken } from "../utils/jwt";

export default class MatchesService {
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
    homeTeam: iMatch,
    awayTeam: iMatch,
    homeTeamGoals: iMatch,
    awayTeamGoals: iMatch,
  ): Promise<{ status: number, message: string | iMatch }> {
    const {status, message} = await validateToken(authorization)

    const match = await Match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true })
    console.log('match>>>>>>>>>>>>><<<<<<<<<<<<<<<<', match);
    
    
    return { status: 201, message: match }
  }

  async updateMatch(id: string): Promise <void> {
    const match = await Match.update({ inProgress: false }, { where: { id } });
  }
}

