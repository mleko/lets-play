import * as assert from "assert";
import {mergeBetsIntoMatches} from "../../../src/component/GameView/mergeBetsIntoMatches";

describe("Test TypingView", () => {
	it("should properly merge bets into matches", () => {
		const result = mergeBetsIntoMatches(fixture.elements, fixture.bets);
		assert.deepEqual(result, fixture.matches);
	});
});

const fixture = {
	elements: [{
		id: "c2f6053d-bfdd-4fb5-a095-f25b8cd84341",
		startDate: "2018-04-14T14:00:00+00:00",
		home: {name: "Polska", score: 2},
		away: {name: "Niemcy", score: 1}
	}, {
		id: "c3f1a1ca-0c7e-4add-9136-6cc85e27bb82",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Anglia", score: 2},
		away: {name: "Francja", score: 2}
	}, {
		id: "7cde23c3-d163-4d77-9d2c-5489af7a55b3",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Polska", score: 3},
		away: {name: "Algieria", score: 1}
	}, {
		id: "0dda1121-7cb5-40a5-b362-a6ec8f2971c9",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Francja", score: 1},
		away: {name: "Niemcy", score: 1}
	}, {
		id: "1b2c36b0-b977-4e05-bbca-547197441383",
		startDate: "2018-04-15T07:52:00+00:00",
		home: {name: "", score: null},
		away: {name: "", score: null}
	}],
	bets: [{
		gameId: "099e74ee-3aca-4562-9bc9-3d0c719c09aa",
		matchId: "c2f6053d-bfdd-4fb5-a095-f25b8cd84341",
		userId: "06590bbd-0f96-4be3-84a4-81811d7212d9",
		bet: {home: 2, away: 1},
		dateTime: "2018-05-19T13:21:26+00:00"
	}, {
		gameId: "099e74ee-3aca-4562-9bc9-3d0c719c09aa",
		matchId: "c3f1a1ca-0c7e-4add-9136-6cc85e27bb82",
		userId: "06590bbd-0f96-4be3-84a4-81811d7212d9",
		bet: {home: 3, away: 1},
		dateTime: "2018-05-19T13:21:26+00:00"
	}, {
		gameId: "099e74ee-3aca-4562-9bc9-3d0c719c09aa",
		matchId: "7cde23c3-d163-4d77-9d2c-5489af7a55b3",
		userId: "06590bbd-0f96-4be3-84a4-81811d7212d9",
		bet: {home: 4, away: 3},
		dateTime: "2018-05-20T08:53:20+00:00"
	}, {
		gameId: "099e74ee-3aca-4562-9bc9-3d0c719c09aa",
		matchId: "0dda1121-7cb5-40a5-b362-a6ec8f2971c9",
		userId: "06590bbd-0f96-4be3-84a4-81811d7212d9",
		bet: {home: 2, away: 1},
		dateTime: "2018-05-20T09:13:13+00:00"
	}],
	matches: [{
		id: "c2f6053d-bfdd-4fb5-a095-f25b8cd84341",
		startDate: "2018-04-14T14:00:00+00:00",
		home: {name: "Polska", score: 2},
		away: {name: "Niemcy", score: 1}
	}, {
		id: "c3f1a1ca-0c7e-4add-9136-6cc85e27bb82",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Anglia", score: 3},
		away: {name: "Francja", score: 1}
	}, {
		id: "7cde23c3-d163-4d77-9d2c-5489af7a55b3",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Polska", score: 4},
		away: {name: "Algieria", score: 3}
	}, {
		id: "0dda1121-7cb5-40a5-b362-a6ec8f2971c9",
		startDate: "2018-04-14T14:55:00+00:00",
		home: {name: "Francja", score: 2},
		away: {name: "Niemcy", score: 1}
	}, {
		id: "1b2c36b0-b977-4e05-bbca-547197441383",
		startDate: "2018-04-15T07:52:00+00:00",
		home: {name: "", score: null},
		away: {name: "", score: null}
	}]
};
