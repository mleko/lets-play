import * as React from "react";

import IconButton, {IconButtonProps} from "material-ui/IconButton";
import {Link, LinkProps} from "react-router-dom";

export class LinkIconButton extends React.Component<IconButtonProps & LinkProps> {
	public render() {
		return (
			<IconButton component={Link} {...this.props as any}/>
		);
	}
}
