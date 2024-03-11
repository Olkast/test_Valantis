import {Button, Spin} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {LIMIT} from "../../const";
import styles from './Pagination.module.scss'

export const Pagination = ({setOffset, loading, offset}) => {
    return (
        <div className={styles.buttonContainer}>
            <Button
                icon={<LeftOutlined/>}
                onClick={() => setOffset(offset - LIMIT)}
                disabled={offset === 0 || loading}
                type="primary"
            />
            <div className={styles.loadingContainer}>
                {loading &&
                    <Spin />
                }
            </div>
            <Button
                icon={<RightOutlined/>}
                disabled={loading}
                onClick={() => setOffset(offset + LIMIT)}
                type="primary"
            />
        </div>
    )
}
