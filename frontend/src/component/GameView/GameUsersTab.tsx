import * as React from "react";

import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary} from "material-ui/ExpansionPanel";
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
