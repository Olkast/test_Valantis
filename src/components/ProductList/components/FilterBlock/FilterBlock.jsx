import {Button, Input, Select, Typography} from "antd";
import {useState} from "react";
import styles from './FilterBlock.module.scss'
import {useGetHandlers} from "./hooks/useGetHandlers";
import {useGetBrandOptions} from "./hooks/useGetBrandOptions";

export const FilterBlock = ({fetchData, setIsFilteredMode}) => {
    const [filters, setFilters] = useState({brand: null, product: '', price: ''});
    const [loading, setLoading] = useState(false);

    const [
        handleFilter,
        handleResetFilter,
        handlePriceInputChange,
        handleProductInputChange,
        handleBrandSelectChange
    ] = useGetHandlers({
        setFilters,
        setLoading,
        fetchData,
        setIsFilteredMode,
        filters
    })

    const [brandOptions] = useGetBrandOptions()

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filterContainer}>
                <Typography.Title level={5}>Filter by price</Typography.Title>
                <Input value={filters.price} onChange={handlePriceInputChange}/>

            </div>
            <div className={styles.filterContainer}>
                <Typography.Title level={5}>Filter by product</Typography.Title>
                <Input value={filters.product} onChange={handleProductInputChange}/>
            </div>
            <div>
                <Typography.Title level={5}>Filter by brand</Typography.Title>
                <Select
                    className={styles.select}
                    value={filters.brand}
                    onChange={handleBrandSelectChange}
                    options={brandOptions}
                />
            </div>
            <Button className={styles.button} disabled={loading} loading={loading} onClick={handleFilter}>
                Фильтровать
            </Button>
            <Button className={styles.button} onClick={handleResetFilter}>
                Сбросить фильтры
            </Button>
        </div>
    )
}
