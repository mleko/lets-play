import {Response} from "./Response";

export interface CollectionResponse<T> extends Response<T[]> {
	pagination: Pagination;
}

interface Pagination {
	count: {
		all: number;
		current: number;
		maxPerPage: number;
	};
	pages: {
		current: number;
		first: number;
		last: number;
	};
}
