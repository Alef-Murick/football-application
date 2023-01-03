import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";
import Team from "../database/models/Team";

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
}

