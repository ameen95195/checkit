import React, {useState} from 'react';
import styles from './AddQuestion.module.css';
import {IconButton, TextField} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import {addQ, getAllQ} from "../../utils/firebase-actions";

const AddQuestion = () => {
    const [question, setQuestion] = useState("")
    const [id, setId] = useState()

    function handelChange(e) {
        if (e.target.id === "id") {
            setId(e.target.value)
        } else
            setQuestion(e.target.value)
    }

    function handelClick() {
        // console.log(addQ("s").then((d) => console.log(d)))
        if (id > 0 && question.trim() !== "")
            addQ(id, question)
    }

    function handelKeyDown(e) {
        if (e.key === "Enter") {
            handelClick()
        }
    }

    return (
        <div className={styles.AddQuestion}>
            <table>
                <tr>
                    <td>
                        <TextField onChange={handelChange} id="id" onKeyDown={handelKeyDown} label="ID"
                                   variant="standard"/>
                    </td>
                    <td>
                        <TextField onChange={handelChange} onKeyDown={handelKeyDown} label="اكتب سؤال"
                                   variant="standard"/>
                    </td>
                    <td>
                        <IconButton color="primary" onClick={handelClick} variant="contained">
                            <AddRounded/>
                        </IconButton>
                    </td>
                </tr>
            </table>

        </div>
    );
}


export default AddQuestion;
