import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { IResponse } from 'casino/types';
import { useToken } from 'casino/hooks';

interface IUseAPIResponse<T> {
	data: IResponse<T> | null;
	isLoading: boolean;
	error: unknown;
	fetchData: (page?: number) => Promise<IResponse<T> | null>;
	nextPage?: () => void;
	setEndpointExternal?: Dispatch<SetStateAction<string>>;
}

interface IUseAPIProps {
	endpoint: string;
	options?: AxiosRequestConfig;
	enablePagination?: boolean;
	initialPerPage?: number;
	autoFetch?: boolean;
}

const createGenericResponse = <T>(
	response: AxiosResponse<IResponse<T | null>>
): IResponse<T | null> => {
	return {
		data: response?.data?.data || null,
		errorCode: response?.data?.errorCode || null,
		message: response?.data?.message || null,
		success: response?.data?.success || false,
	};
};

export const useAPI = <T>(parameters: IUseAPIProps): IUseAPIResponse<T> => {
	const {
		endpoint,
		options,
		enablePagination = false,
		initialPerPage = 10,
		autoFetch = true,
	} = parameters;
	const [data, setData] = useState<IResponse<T> | null>(null);
	const [endpointExternal, setEndpointExternal] = useState<string>(endpoint);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);
	const [, setPage] = useState<number>(1);
	const { userToken, token } = useToken();
	let paramOptions = options;

	const fetchData = async (page: number = 1): Promise<IResponse<T>> => {
		setLoading(true);
		try {
			let apiURL = `${process.env.REACT_APP_API_URL}/${endpointExternal}`;

			if (enablePagination) {
				apiURL += `?page=${page}&limit=${initialPerPage}`;
			}

			if (userToken) {
				paramOptions = {
					...paramOptions,
					headers: {
						...paramOptions?.headers,
						'token': token
					},
				};
			}

			const response: AxiosResponse<IResponse<T>> = await axios(
				apiURL,
				paramOptions
			);
			if (enablePagination && page > 1) {
				setData((prevData) => {
					const prevDataArray = Array.isArray(prevData?.data) ? prevData.data : [];
					const responseDataArray = Array.isArray(response?.data?.data) ? response.data.data : [];

					const paginationResponse = {
						...response,
						data: {
							...response.data,
							...{ data: [...prevDataArray, ...responseDataArray] },
						},
					};

					const returnData = createGenericResponse(paginationResponse) as IResponse<T>;

					return returnData;
				});

				const returnData = createGenericResponse(response) as IResponse<T>;

				return returnData;
			} else {
				const value = response?.data || null;
				setData(value);
				const returnData = createGenericResponse(response) as IResponse<T>;

				return returnData;
			}
		} catch (err) {
			const error = err as AxiosError;
			setError(error.message);

			const errorResponse = {
				data: null,
				errorCode: error.code || null,
				message: error.message || null,
				success: false,
			};

			return errorResponse;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, []);

	useEffect(() => {
		setEndpointExternal(endpoint);
	}, [endpoint]);

	const nextPage = enablePagination
		? (): void => {
			if (!isLoading) {
				setPage((prevPage) => {
					const nextPage = prevPage + 1;
					fetchData(nextPage);

					return nextPage;
				});
			}
		}
		: undefined;

	return {
		data,
		isLoading,
		error,
		fetchData,
		setEndpointExternal,
		...(enablePagination && { nextPage }),
	};
};
