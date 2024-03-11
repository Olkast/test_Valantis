import axios from "axios";
import md5 from "md5";
import axiosRetry from "axios-retry";

const currentData = new Date().toISOString().slice(0,10).replace(/-/g,"");
const apiUrl = 'https://api.valantis.store:41000';

const instance = axios.create({
    baseURL: apiUrl,
    headers: {
        'X-Auth': md5(`Valantis_${currentData}`),
        'Content-Type': 'application/json'
    }
});

axiosRetry(instance, {
    retries: 3, // Number of retries
    retryDelay: axiosRetry.exponentialDelay, // Exponential backoff delay
    retryCondition: (error) => {
        return error.response.status >= 500 && error.response.status < 600;
    },
});

export const Api = {
    getIds({offset, limit}) {
        return instance.post('/',
            {
                "action": "get_ids",
                "params": {"offset": offset, "limit": limit}
            })
            .then(response => response.data.result)
            .catch((error) => {
            console.warn(error.response.data)})
    },

    getItems({ids}) {
        return instance.post('/',
            {
                "action": "get_items",
                "params": {"ids": ids}
            })
            .then((response) => response.data.result)
            .catch((error) => {
                console.warn(error.response.data)
            });
    },

    getFields() {
        return instance.post('/',
            {
                "action": "get_fields",
                "params": {"field": "brand"}
            }).then(response => response.data.result).catch((error) => {
            console.warn(error.response.data)})
    },

    getFilter({filters}) {
        return instance.post('/',
            {
                "action": "filter",
                "params": filters
            }).then(response => response.data.result).catch((error) => {
            console.warn(error.response.data)})
    },
}