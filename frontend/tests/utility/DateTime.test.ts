import * as assert from "assert";
import {DateTime} from "../../src/utility/DateTime";

describe("DateTime.toInputString", () => {
	it("should format date", () => {
		assert.equal(DateTime.toInputString(new Date("2017-06-01T08:30:15")), "2017-06-01T08:30");
	});
	it("should format date with seconds", () => {
		assert.equal(DateTime.toInputString(new Date("2017-06-01T08:30:15"), {withSeconds: true}), "2017-06-01T08:30:15");
	});
});
