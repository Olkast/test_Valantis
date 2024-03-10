import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {LIMIT} from "../../const";
import styles from './Pagination.module.scss'

export const Pagination = ({setOffset, hasProductList, loading, offset}) => {
    return (
        <div className={styles.buttonContainer}>
            <Button icon={<LeftOutlined/>} onClick={() => setOffset(offset - LIMIT)} disabled={offset === 0 || loading}
                    type="primary" loading={loading && hasProductList}/>
            <Button icon={<RightOutlined/>} onClick={() => setOffset(offset + LIMIT)} type="primary"
                    loading={loading && hasProductList}/>
        </div>
    )
}
