import * as React from "react";

import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import {replace} from "typescript-array-utils";
import {shallowMergeDeep} from "typescript-object-utils";
import {Bet, Match, MatchScore, MatchSet} from "../../model/models";
import {MatchRow} from "../MatchRow";
import {Results} from "../Results";

export interface TypingViewProps {
	matchSet: MatchSet;
	bets: Bet[];
	onSave: (bets: Bet[]) => any;
}

export class TypingView extends React.PureComponent<TypingViewProps, State> {

	public constructor(props: TypingViewProps) {
		super(props);
		this.state = {
			bets: props.bets
		};
	}

	public render(): JSX.Element {
		const elements: Match[] = this.props.matchSet ? this.props.matchSet.matches : [];
		const bets: Bet[] = this.state.bets ? this.state.bets : [];
		const matches = elements.map((m: Match) => {
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

		return (
			<div>
				<Grid container={true} spacing={16} style={{marginTop: 16}}>
					{matches.map(this.renderElement)}
				</Grid>
				<Button
					fullWidth={true}
					color={"primary"}
					variant={"raised"}
					onClick={this.save}
				>
					Zapisz
				</Button>
				<Results/>

			</div>
		);
	}

	public componentWillReceiveProps(nextProps: Readonly<TypingViewProps>, nextContext: any): void {
		if (nextProps.bets !== this.props.bets) {
			this.setState({bets: nextProps.bets});
		}
	}

	private renderElement = (e: Match, index: number) => {
		return (
			<MatchRow
				match={e}
				key={String(index)}
				index={index}
				editDate={false}
				editName={false}
				onChange={this.edit}
			/>
		);
	};

	private edit = (match: Match) => {
		let bets = this.state.bets;
		const betIndex = bets.findIndex((bet: Bet) => {
			return bet.matchId === match.id;
		});
		if (-1 === betIndex) {
			bets = bets.concat([{matchId: match.id, bet: {home: match.home.score, away: match.away.score}}]);
		} else {
			bets = replace(bets, betIndex,
				shallowMergeDeep(bets[betIndex], {
					bet: {
						home: match.home.score,
						away: match.away.score
					}
				})
			);
		}
		this.setState({bets});
	};
	private save = () => {
		this.props.onSave(this.state.bets);
	};
}

interface State {
	bets: Bet[];
}
