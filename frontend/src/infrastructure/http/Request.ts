export interface Request {
	[id: string]: any;
	method?: HttpMethod;
	headers?: {[key: string]: string};
	url: string;
	data?: any;
	queryData?: {[id: string]: any};
}

export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
