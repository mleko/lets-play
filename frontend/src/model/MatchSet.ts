import {shallowMerge} from "typescript-object-utils";
import {Client} from "../infrastructure/http/Client";
import {Response} from "../infrastructure/http/Response";
import {denormalizeMatch} from "./Match";
import {Match, Model} from "./models";

export interface MatchSet extends Model {
	name: string;
	matches: Match[];
	ownerId: string;
}

export function denormalizeMatchSet(ms: { [id: string]: any }): MatchSet {
	return {
		id: ms.id,
		name: ms.name,
		ownerId: ms.ownerId,
		matches: ms.matches.map(denormalizeMatch)
	};
}

function denormalizePromise(p: Promise<Response<{ [id: string]: any }>>): Promise<Response<MatchSet>> {
	return p.then((response: Response<{ [id: string]: any }>) => {
		return shallowMerge(
			response,
			{data: denormalizeMatchSet(response.data)}
		);
	});
}

export class MatchSetRepository {
	public static fetch(setId: string, client: Client): Promise<Response<MatchSet>> {
		return denormalizePromise(client.request({url: "/match-sets/" + setId, method: "GET"}));
	}

	public static save(set: MatchSet, client: Client): Promise<Response<MatchSet>> {
		const data = shallowMerge(set, {
			matches: set.matches.map((m) => {
				return shallowMerge(m, {startDate: m.startDate.toISOString()});
			})
		});
		if (set.id) {
			return denormalizePromise(client.request({url: "/match-sets/" + set.id, method: "PUT", data}));
		} else {
			return denormalizePromise(client.request({url: "/match-sets", method: "POST", data}));
		}
	}
}
