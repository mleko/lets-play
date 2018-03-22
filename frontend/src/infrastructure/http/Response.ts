export interface Response<T> {
	success: boolean;
	result?: T;
	meta?: any;
	debug?: any;
}
