import axios, {AxiosPromise, AxiosRequestConfig} from "axios";
import {mergeDeep} from "typescript-object-utils";

import {Client} from "../Client";
import {HttpMethod, Request} from "../Request";

export class AxiosHttpClient implements Client {

	private static defaults = {
		method: "GET" as HttpMethod,
		headers: {"Content-Type": "application/json"}
	};

	public requestDefaults: Partial<Request>;

	public constructor(requestDefaults: Partial<Request> = {}, private options: Options = {}) {
		this.requestDefaults = mergeDeep(AxiosHttpClient.defaults, requestDefaults);
	}

	public request<T>(request: Request): Promise<T> {
		const promise: AxiosPromise = axios.request(this.assembleRequest(request));

		// Repack AxiosPromise into Promise
		return new Promise((resolve, reject) => {
			promise.then((r) => {
				if (r.headers["x-csrf"]) {
					if (this.requestDefaults.headers === undefined) {
						this.requestDefaults.headers = {};
					}
					this.requestDefaults.headers["x-csrf"] = r.headers["x-csrf"];
				}
				resolve(r.data);
			});
			promise.catch((r) => {
				reject(r.response.data);
			});
		});
	}

	private assembleRequest(request: Request) {
		const merged: Request = mergeDeep(this.requestDefaults, request);
		const url: string = `${this.options.baseUrl || ""}${request.url || ""}`;

		const axiosRequest: AxiosRequestConfig = {
			url,
			method: merged.method,
			headers: merged.headers,
			params: merged.queryData
		};
		if (-1 === ["GET", "HEAD"].indexOf((merged.method || "GET").toUpperCase()) && merged.hasOwnProperty("data")) {
			axiosRequest.data = JSON.stringify(merged.data);
		}
		return axiosRequest;
	}

}

interface Options {
	[id: string]: any;

	baseUrl?: string;
}
