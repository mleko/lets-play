import {Request} from "./Request";

export interface Client {
	requestDefaults: Partial<Request>;
	request<T>(request: Request): Promise<T>;
}
