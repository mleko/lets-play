import * as React from "react";

import {ExpansionPanelDetails, ExpansionPanelSummary} from "material-ui";
import {ExpandMore as ExpandMoreIcon} from "material-ui-icons";
import Divider from "material-ui/Divider";
import ExpansionPanel from "material-ui/ExpansionPanel";
import {GameInvites} from "../../container/GameInvites";
import {GameUsers} from "../../container/GameUsers";

export interface GameUsersProps {
	gameId: string;
}

export class GameUsersTab extends React.PureComponent<GameUsersProps, {}> {

	public constructor(props: GameUsersProps) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<div>
				<GameUsers gameId={this.props.gameId}/>
				<div>
					<Divider/>
					<ExpansionPanel>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
							Zaproszenia
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<GameInvites gameId={this.props.gameId}/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</div>
			</div>
		);
	}

}
