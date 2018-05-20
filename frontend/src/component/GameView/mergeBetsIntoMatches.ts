import {Bet, Match, MatchScore} from "../../model/models";

export function mergeBetsIntoMatches(matches: Match[], bets: Bet[]): Match[] {
	return matches.map((m: Match) => {
		const betIndex = bets.findIndex((bet: Bet) => {
			return bet.matchId === m.id;
		});
		const score = -1 !== betIndex ? bets[betIndex].bet : {
			home: null,
			away: null
		} as MatchScore;
		return {
			...m,
			home: {
				...m.home,
				score: score.home
			},
			away: {
				...m.away,
				score: score.away
			}
		} as Match;
	});
}
