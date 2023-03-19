import Axios, { AxiosResponse } from "axios";

interface IData {
    [key: string]: string | number | boolean;
}
const createAxiosInstance = (baseURL: string) => {
    return Axios.create({
        baseURL: baseURL,
        responseType: "json",
    });
}
const axiosInstance = createAxiosInstance("https://jsonplaceholder.typicode.com");

const post = (url: string, data: IData) => {
    return axiosInstance.post(url, data);
};

const get = (url: string) => {
    return axiosInstance.get(url);
};

const commonAPIService = {
    post,
    get
};

export default commonAPIService;