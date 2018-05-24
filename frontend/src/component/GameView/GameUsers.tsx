import * as React from "react";

import Divider from "material-ui/Divider";
import {GameInvites} from "../../container/GameInvites";

export interface GameUsersProps {
	gameId: string;
}

export class GameUsers extends React.PureComponent<GameUsersProps, {}> {

	public constructor(props: GameUsersProps) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<div>
				GameUsers
				<div>
					<Divider/>
					<h3>Zaproszenia</h3>
					<GameInvites gameId={this.props.gameId}/>
				</div>
			</div>
		);
	}

}
