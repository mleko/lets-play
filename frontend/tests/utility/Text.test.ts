import * as assert from "assert";
import {Text} from "../../src/utility/Text";

describe("Text.pad", () => {
	it("should properly pad left", () => {
		assert.equal("  12", Text.pad("12", 4));
	});
	it("should properly pad left", () => {
		assert.equal("0012", Text.pad("12", 4, "0"));
	});
	it("should properly pad right", () => {
		assert.equal("1200", Text.pad("12", 4, "0", false));
	});
	it("should leave long string not modified", () => {
		assert.equal("0012", Text.pad("0012", 1, "-"));
	});
	it("properly apply pad pattern", () => {
		assert.equal("1234*", Text.pad("*", 5, "1234567"));
		assert.equal("12121*", Text.pad("*", 6, "12"));
	});
});
