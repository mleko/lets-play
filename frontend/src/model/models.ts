export interface MatchTeam {
	name: string;
	score?: number;
}

export interface Match {
	id?: string;
	startDate?: string;
	home: MatchTeam;
	away: MatchTeam;
}
