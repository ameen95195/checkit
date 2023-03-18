import React, {useEffect, useState} from 'react';
import styles from './ResultPage.module.css';

const ResultPage = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(props.data)
    }, [props])

    return (
        <div className={styles.ResultPage}>
            <div>
                <div>
                    <div style={{overflowY: "auto"}}>
                        {data && data.map((d, index) => {
                            if (d.message && d.message.content) {
                                return (
                                    <div key={"data " + index}>
                                        <ul>
                                            {d.q.data}
                                        </ul>
                                        <li>
                                            {d.message.content}
                                        </li>
                                        <br/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

ResultPage.propTypes = {};

ResultPage.defaultProps = {"data": [{}]};

export default ResultPage;
