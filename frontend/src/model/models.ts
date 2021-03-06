export {Match, MatchTeam} from "./Match";
export {MatchSet} from "./MatchSet";

export interface Model {
	id?: string;
}

export interface User extends Model {
	name: string;
}

export interface Game extends Model {
	name: string;
	matchSetId?: string;
}

export interface MatchScore {
	home?: number;
	away?: number;
}

export interface Bet {
	bet: MatchScore;
	matchId: string;
	userId?: string;
	points?: number;
}

export interface HandA<T> {
	home: T;
	away: T;
}

export interface RankingEntry {
	userId: string;
	user?: User;
	points: number;
}

export type Ranking = RankingEntry[];

export interface GameInvite extends Model {
	gameId: string;
	status: number;
}

export interface GameInvitation extends Model {
	game: Game;
}
