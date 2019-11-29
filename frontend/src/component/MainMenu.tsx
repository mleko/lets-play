import * as React from "react";

import ListIcon from "material-ui-icons/List";
import PlayIcon from "material-ui-icons/PlayArrow";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import List, {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import {Link} from "./Link";
import {Trans} from "react-i18next";

export interface MainMenuProps {
	open: boolean;

	onMenuClose: () => any;
}

export class MainMenu extends React.PureComponent<MainMenuProps, {}> {
	public render(): JSX.Element {
		return (
			<Drawer
				open={this.props.open}
				style={{position: "relative"}}
				onClick={this.props.onMenuClose}
				onKeyDown={this.props.onMenuClose}
			>
				<div
					tabIndex={0}
					role="button"
					style={{width: 250}}
				>
					<List component="nav">
						<Link to={"/"}>
							<ListItem>
								<ListItemIcon><PlayIcon/></ListItemIcon>
								<ListItemText primary={<Trans>Competition</Trans>}/>
							</ListItem>
						</Link>
						<Divider/>
						<Link to={"/match-sets"}>
							<ListItem>
								<ListItemIcon><ListIcon/></ListItemIcon>
								<ListItemText primary={<Trans>Match Sets</Trans>}/>
							</ListItem>
						</Link>
					</List>
				</div>
			</Drawer>
		);
	}
}
