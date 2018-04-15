import {Text} from "./Text";

export class DateTime {
	public static toInputString(date: Date, options: { withSeconds?: boolean } = {}): string {
		let result =
			date.getFullYear() + "-"
			+ Text.pad((date.getMonth() + 1).toString(), 2, "0") + "-"
			+ Text.pad(date.getDate().toString(), 2, "0")
			+ "T"
			+ Text.pad(date.getHours().toString(), 2, "0") + ":"
			+ Text.pad(date.getMinutes().toString(), 2, "0");
		if (options.withSeconds) {
			result += ":" + date.getSeconds();
		}
		return result;
	}
}
