import React, {useState} from 'react';
import styles from './Home.module.css';
import {CircularProgress, Dialog, IconButton, TextField} from "@mui/material";
import {Label, SearchRounded} from "@mui/icons-material";
import {sendQuestionGPT} from "../../utils/chatGPT-api";
import {getAllQ} from "../../utils/firebase-actions";
import ResultPage from "../ResultPage/ResultPage";
import saudi_flag from "../../saudi_flag.png"


const Home = () => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [retDataFromChatgpt, setRetDataFromChatgpt] = useState([])
    const [questions, setQuestions] = useState([])
    const [updateView, setUpdateView] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const qsAndAnswers = [""]

    function handelChange(e) {
        setSearch(e.target.value)
    }


    function handelClick() {
        console.log(search)
        setLoading(true)
        getAllQ().then(query => {
            const qs = []
            query.forEach(doc => {
                qs.push({data: doc.data().data.replace("___", search), id: doc.data().id, title: doc.data().title})
            })
            let counter = 0
            const qs_sorted = qs.sort((a, b) => a.id < b.id)
            qs_sorted.forEach((q, index) => {
                sendQuestionGPT(q.data).then(d => {
                    // console.log(d)
                    console.log(index)
                    setOpenDialog(true)

                    qsAndAnswers[index] = {...d.choices[0], q: q}
                    setRetDataFromChatgpt(qsAndAnswers) // called two times to update the page with new data
                    setUpdateView(prevState => !prevState)
                    counter += 1
                    if (counter === qs_sorted.length) {
                        setLoading(false)
                    }
                })
            })
            console.log(qsAndAnswers)

            setQuestions(qs)
        })


    }

    function handelKeyDown(e) {
        if (e.key === "Enter") {
            handelClick()
        }
    }

    return (<div className={styles.Home}>
            <div className={styles.Container}>
                <div className={styles.Content}>
                    <table>
                        <thead>
                        <tr>
                            <td>
                                <img style={{width: "5vw", height: "5vh"}} src={saudi_flag} alt={"علم السعودية"}/>
                            </td>
                            <td>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    dir={"rtl"} onChange={handelChange}
                                    onKeyDown={handelKeyDown} label="بحث"
                                    variant="standard"
                                    size={"small"}
                                    style={{textAlign: "right", direction: "rtl", width: "50vh", fontSize: "14"}}
                                />
                            </td>
                            <td>
                                <IconButton color="primary" onClick={handelClick} variant="contained"
                                    style={{backgroundColor: "#753fad", color: "white"}}
                                >
                                    <SearchRounded/>
                                </IconButton>
                            </td>
                        </tr>
                        </thead>
                    </table>
                    {loading && (<CircularProgress color="inherit"/>)}

                    <div>
                        <br/>
                        <br/>
                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                            <ResultPage data={retDataFromChatgpt}/>
                        </Dialog>


                    </div>
                    {updateView && (<div></div>)}

                </div>
            </div>
        </div>);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
