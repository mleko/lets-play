import {Model} from "./models";

export interface Match extends Model {
	startDate?: Date;
	home: MatchTeam;
	away: MatchTeam;
	locked?: boolean;
}

export interface MatchTeam {
	name: string;
	score?: number;
}

function denormalizeMatchTeam(mt: { [id: string]: any }): MatchTeam {
	return {
		score: mt.score,
		name: mt.name
	};
}

export function denormalizeMatch(m: { [id: string]: any }): Match {
	return {
		id: m.id,
		startDate: new Date(m.startDate),
		home: denormalizeMatchTeam(m.home),
		away: denormalizeMatchTeam(m.away),
		locked: m.locked
	};
}

export class MatchRepository {

}
