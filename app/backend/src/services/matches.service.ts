import { iMatch } from "../interfaces/iMatch";
import Match from "../database/models/Match";

export default class MatchesService {
  async getAllMatches(): Promise<{ status: number, message: iMatch[] }> {
    const matches = await Match.findAll();
    return { status: 200, message: matches}
  }
}