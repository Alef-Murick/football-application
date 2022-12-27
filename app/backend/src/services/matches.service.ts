import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";

export default class MatchesService {
  async findAllMatches(): Promise<{ status: number, message: iMatch[] }> {
    const matches = await Match.findAll();
    return { status: 200, message: matches}
  }

  async findLiveMatches(): Promise<{ status: number, message: string | iMatch[] }>  {
    const matches = await Match.findAll()
    matches.map(match => {
      if (match.inProgress === true) {
        return match
      };
      return { status: 200, message: match }
    });
    return { status: 404, message: 'Theres no live game at the moment' };
  }
}

