import {useEffect, useState} from "react";
import {Api} from "../../api/api";
import {Button, Input, Select, Table, Typography} from "antd";
import {getColumns} from "./helpers/getColumns";
import {LeftOutlined, PoweroffOutlined, RightOutlined} from "@ant-design/icons";




const LIMIT = 5;

export const ProductList = (props) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [brandOptions, setBrandOptions] = useState([]);
    const [isFilteredMode, setIsFilteredMode] = useState(false);
    const [filters, setFilters] = useState({brand: null, product: '', price: ''});

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

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                <div style={{ width: '190px' }}>
                    <Typography.Title level={5}>Filter by price</Typography.Title>
                    <Input value={filters.price} onChange={(value) => {
                        setFilters((prevState) => {
                            return {
                                ...prevState,
                                price: value.target.value
                            }
                        })
                    }}/>

                </div>
                <div style={{ width: '190px' }}>
                    <Typography.Title level={5}>Filter by product</Typography.Title>
                    <Input  value={filters.product} onChange={(value) => {
                        setFilters((prevState) => {
                            return {
                                ...prevState,
                                product: value.target.value
                            }
                        })
                    }}/>
                </div>
                <div>
                    <Typography.Title level={5}>Filter by brand</Typography.Title>
                    <Select
                        style={{ width: 190 }}
                        value={filters.brand}
                        onChange={(value) => {
                            setFilters((prevState) => {
                                return {
                                    ...prevState,
                                    brand: value
                                }
                            })
                        }}
                        options={brandOptions}
                    />
                </div>
                <div>
                    <Button style={{ width: '190px' }} onClick={() => {
                        setLoading(true);
                        Api.getFilter({filters}).then((data) => {
                            setLoading(false);
                            if(data?.length) {
                                fetchData(data);
                                setIsFilteredMode(true)
                            }
                        })}}>Фильтровать</Button>
                </div>
                <Button style={{ width: '190px' }} onClick={() => {
                    setIsFilteredMode(false)
                    setFilters({brand: null, product: '', price: ''})
                }}>Сбросить фильтры</Button>
            </div>
            <Table
                columns={getColumns()}
                rowKey={({id}) => id}
                dataSource={productList}
                pagination={false}
                loading={loading && !productList.length}
            />
            {
                !!productList?.length && !isFilteredMode && (
                    <div style={{display: 'flex'}}>
                        <Button icon={<LeftOutlined/>} onClick={() => setOffset(offset - LIMIT)} disabled={offset === 0 || loading} type="primary" loading={loading && productList} />
                        <Button icon={<RightOutlined />} onClick={() => setOffset(offset+LIMIT)} type="primary" loading={loading && productList} />
                    </div>
                )
            }
        </>
    );
};

