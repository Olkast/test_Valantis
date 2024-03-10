import {Api} from "../../../api";
import {useEffect, useState} from "react";
import {LIMIT} from "../const";

export const useGetFetchData = ({offset, isFilteredMode}) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = (ids) => {
        setLoading(true);
        Api.getItems({ids}).then(products => {
            const uniqueProducts = products?.reduce((accumulator, currentValue) => {
                const isIdUnique = !accumulator.some(product => product.id === currentValue.id);
                if (isIdUnique) {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);

            setProductList(uniqueProducts);
            setLoading(false);
        })
    };

    useEffect(()  => {
        if (!isFilteredMode) {
            setLoading(true);
            Api.getIds({offset, limit: LIMIT}).then(data => {
                setLoading(false);
                if(data?.length) {
                    fetchData(data);
                }
            })
        }
    }, [offset, isFilteredMode]);

    return [productList, loading, fetchData]
}
