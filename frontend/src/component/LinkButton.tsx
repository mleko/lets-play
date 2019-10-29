import * as React from "react";

import Button, {ButtonProps} from "@material-ui/core/Button";
import {Link, LinkProps} from "react-router-dom";

export class LinkButton extends React.Component<ButtonProps & LinkProps> {
	public render() {
		return (
			<Button component={Link} {...this.props as any}/>
		);
	}
}
