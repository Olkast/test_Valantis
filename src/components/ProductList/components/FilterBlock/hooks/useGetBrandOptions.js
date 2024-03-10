import {useEffect, useState} from "react";
import {Api} from "../../../../../api";

export const useGetBrandOptions = () => {
    const [brandOptions, setBrandOptions] = useState([]);

    useEffect(() => {
        Api.getFields().then(data => {
            if(data) {
                const options = [...new Set(data)].map((item) => {
                    if(item) {
                        return  { value: item, label: item }
                    }
                })
                setBrandOptions(options.filter((item) => item))
            }
        })
    }, []);

    return [brandOptions]
}
