import React, {useEffect, useState} from 'react';
import styles from './ResultPage.module.css';
import PropTypes from "prop-types";

const ResultPage = (props) => {
    const [data, setData] = useState()

    useEffect(() => {
        setData(props.data)
    }, [props])

    return (
        <div className={styles.ResultPage}>
            <div>
                <div>
                    <pre style={{overflowY: "auto"}} className={styles.wrap}>
                        {data}
                    </pre>
                </div>
            </div>
        </div>
    );
}

ResultPage.propTypes = {
    data: PropTypes.string.isRequired,
};

ResultPage.defaultProps = {"data": [{}]};

export default ResultPage;
