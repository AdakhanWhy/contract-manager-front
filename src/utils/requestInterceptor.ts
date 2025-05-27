import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = <T1, T2 extends InternalAxiosRequestConfig<T1>>(config: T2): T2 => {
    const headers: AxiosRequestHeaders = config.headers || {};
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }
    return { ...config, headers };
};