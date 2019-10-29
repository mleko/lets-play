import * as React from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Trans} from "react-i18next";
import {Bet, User} from "../../model/models";
import {MatchList} from "./MatchList";

export interface UserBetsDialogProps {
	title: string;
	bets: Bet[] | null;
	users: User[] | null;
	onClose: () => any;
}

export class MatchBetsDialog extends React.PureComponent<UserBetsDialogProps, {}> {
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
		if (null === this.props.bets || null === this.props.users) {
			return (
				<div style={{textAlign: "center"}}>
					<CircularProgress size={200}/>
				</div>
			);
		}
		return this.renderTable();
	}

	private renderTable() {
		const {users, bets} = this.props;
		const userBets = users.map((u: User) => {
			const betIndex = bets.findIndex((b: Bet) => {
				return b.userId === u.id;
			});
			return {
				user: u,
				bet: betIndex === -1 ? null : bets[betIndex]
			};
		}).sort(((a, b) => {
			if (a.bet && b.bet) {
				return  b.bet.points - a.bet.points;
			} else if (a.bet === null && b.bet === null) {
				return a.user.name.localeCompare(b.user.name);
			} else {
				return a.bet ? -1 : 1;
			}
		}));
		return (
			<Paper style={{width: "100%", overflow: "scroll"}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><Trans>User</Trans></TableCell>
							<TableCell padding={"dense"}><Trans>Pick</Trans></TableCell>
							<TableCell padding={"dense"}><Trans>Points</Trans></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userBets.map(this.renderRow)}
					</TableBody>
				</Table>
			</Paper>
		);
	}

	private renderRow = (userBet: { user: User, bet?: Bet }, index: number) => {
		const bet = userBet.bet;
		const score = bet ? {
			home: bet.bet.home,
			away: bet.bet.away,
		} : null;
		return (
			<TableRow key={index}>
				<TableCell>{userBet.user.name}</TableCell>
				<TableCell padding={"dense"}><div style={{width: "4em"}}>{MatchList.scoreToString(score)}</div></TableCell>
				<TableCell padding={"dense"}>{bet && typeof bet.points === "number" ? bet.points : " - "}</TableCell>
			</TableRow>
		);
	}
}
