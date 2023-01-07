import axios from "axios";

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs';
const BASE_URL = 'https://api.dev.pastorsline.com/api/';

const handleSuccess = (response) => {
    return response.data;
};

const Api = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
    },
});

Api.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${TOKEN}`;

    return config;
}, function (error) {
    return Promise.reject(error);
});

export const ApiCall = (method, url, data) => Api[method](url, data).then(handleSuccess);