import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";

export default class MatchesService {
  async findAllMatches(): Promise<{ status: number, message: iMatch[] }> {
    const matches = await Match.findAll();
    return { status: 200, message: matches}
  }

  async findLiveMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
    const matches = await Match.findAll({where: {inProgress: true }})
      return { status: 200, message: matches }
  }

async findFinishedMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
  const matches = await Match.findAll({where: {inProgress: false }})
    return { status: 200, message: matches }
}
}

