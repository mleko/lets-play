export class Text {
	public static pad(str: string, length: number, pad: string = " ", left: boolean = true) {
		if (str.length >= length) {
			return str;
		}
		let padding = "";
		for (let n = Math.ceil((length - str.length) / pad.length); n > 0; n--) {
			padding += pad;
		}
		padding = padding.substr(0, length - str.length);
		return (left ? padding + str : str + padding);
	}
}
