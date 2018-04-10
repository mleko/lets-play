export interface Response<T> {
	success: boolean;
	data?: T;
	meta?: any;
	debug?: any;
}
