import {useState} from "react";
import {Table} from "antd";
import {getColumns} from "./helpers";
import {FilterBlock} from "./components/FilterBlock";
import {Pagination} from "./components/Pagination";
import {useGetFetchData} from "./hooks/useGetFetchData";

export const ProductList = () => {
    const [isFilteredMode, setIsFilteredMode] = useState(false);
    const [offset, setOffset] = useState(0);
    const [productList, loading, fetchData] = useGetFetchData({isFilteredMode, offset})

    const isVisiblePagination = !!productList?.length && !isFilteredMode

    return (
        <>
            <FilterBlock fetchData={fetchData} setIsFilteredMode={setIsFilteredMode} />
            <Table
                columns={getColumns()}
                rowKey={({id}) => id}
                dataSource={productList}
                pagination={false}
                loading={loading && !productList.length}
            />
            {
                isVisiblePagination && (
                    <Pagination loading={loading} hasProductList={!!productList} setOffset={setOffset} offset={offset}/>
                )
            }
        </>
    );
};

