import * as React from "react";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import {mergeDeep} from "typescript-object-utils";

export class Link extends React.PureComponent<RouterLinkProps, {}> {
	public render(): JSX.Element {
		const props = mergeDeep(this.props, {style: {textDecoration: "none", color: "inherit"}});
		return (
			<RouterLink {...props}/>
		);
	}
}
