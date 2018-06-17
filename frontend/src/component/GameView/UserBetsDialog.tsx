import * as React from "react";

import Button from "material-ui/Button";
import Dialog, {DialogActions, DialogContent, DialogTitle} from "material-ui/Dialog";
import CircularProgress from "material-ui/Progress/CircularProgress";
import {Trans} from "react-i18next";
import {Match} from "../../model/Match";
import {Bet} from "../../model/models";
import {MatchList} from "./MatchList";

export interface UserBetsDialogProps {
	title: string;
	gameId: string;
	bets: Bet[] | null;
	matches: Match[] | null;
	onClose: () => any;
}

export class UserBetsDialog extends React.PureComponent<UserBetsDialogProps, {}> {
	public render(): JSX.Element {
		return (
			<Dialog
				open={true}
				maxWidth={"md"}
				onClose={this.props.onClose}
				aria-labelledby="user-bets-dialog-title"
			>
				<DialogTitle id="user-bets-dialog-title">{this.props.title}</DialogTitle>
				<DialogContent>
					<div style={{marginTop: 5}}>
						{this.renderContent()}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} color="primary" autoFocus={true}>
						<Trans>Close</Trans>
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	private renderContent() {
		if (null === this.props.matches || null === this.props.bets) {
			return (
				<div style={{textAlign: "center"}}>
					<CircularProgress size={200}/>
				</div>
			);
		}
		const matches = this.props.matches.filter((m: Match) => {
			return m.locked;
		});
		return (
			<MatchList matches={matches} bets={this.props.bets} gameId={this.props.gameId}/>
		);
	}
}
