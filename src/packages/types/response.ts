export interface IResponse<T> {
	data: T | null;
	errorCode: string | null;
	message: string | null;
	success: boolean;
}
