import {Api} from "../../../../../api";

export const useGetHandlers = ({
                                   setFilters,
                                   setLoading,
                                   fetchData,
                                   setIsFilteredMode,
                                   filters
}) => {
    const handlePriceInputChange = (value) => {
        setFilters((prevState) => {
            return {
                ...prevState,
                price: value.target.value
            }
        })
    }

    const handleProductInputChange = (value) => {
        setFilters((prevState) => {
            return {
                ...prevState,
                product: value.target.value
            }
        })
    }

    const handleBrandSelectChange = (value) => {
        setFilters((prevState) => {
            return {
                ...prevState,
                brand: value
            }
        })
    }

    const handleFilter = () => {
        setLoading(true);
        const newFilters = {
            ...filters.brand ? {brand: filters.brand} : undefined,
            ...filters.price ? {price: filters.price} : undefined,
            ...filters.product ? {product: filters.product} : undefined,
        }

        Api.getFilter({filters: newFilters}).then((data) => {
            setLoading(false);
            if (data?.length) {
                fetchData(data);
                setIsFilteredMode(true)
            }
        })
    }

    const handleResetFilter = () => {
        setIsFilteredMode(false)
        setFilters({brand: null, product: '', price: ''})
    }

    return [handleFilter, handleResetFilter, handlePriceInputChange, handleProductInputChange, handleBrandSelectChange]
}
