import * as React from "react";
import {ChangeEvent} from "react";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";

export interface SelectProps {
	value: any;
	options: Option[];
	id?: string;
	onChange: (newValue: any) => any;
}

export interface Option {
	label: string;
	value: any;
}

export class Select extends React.PureComponent<SelectProps, {}> {
	public render(): JSX.Element {
		return (
			<MuiSelect
				value={this.props.value || ""}
				onChange={this.handleChange}
				input={<Input id={this.props.id} fullWidth={true}/>}
			>
				{this.props.options.map(this.renderOption)}
			</MuiSelect>
		);
	}

	private renderOption = (option: Option, index: number) => {
		return (<MenuItem value={option.value} key={index}>{option.label}</MenuItem>);
	};

	private handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		this.props.onChange(event.target.value);
	}
}
