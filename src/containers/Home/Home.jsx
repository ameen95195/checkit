import React, {useState} from 'react';
import styles from './Home.module.css';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogContent, DialogTitle,
    Grid,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import {Label, SearchRounded} from "@mui/icons-material";
import {sendQuestionGPT} from "../../utils/chatGPT-api";
import {getAllQ} from "../../utils/firebase-actions";
import ResultPage from "../ResultPage/ResultPage";
import saudi_flag from "../../saudi_flag.png"
import Entry_row from "../../views/entry_row/entry_row";
import {preTextGPTExplination} from "../../utils/consts";


const Home = () => {
    const [search, setSearch] = useState("")
    const [answer, setAnswer] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [materials, setMaterials] = useState([{
        name: "",
        value: ""
    }])

    function handelChange(e) {
        setSearch(e.target.value)
    }


    function handelClick() {
        console.log(search)
        setAnswer(true)

        setLoading(true)

        /*
            Classify this product:
            the product contained sulfate chondroitin 600 ,
        * */

        const q = preTextGPTExplination + ".\nPlease classify the product based on the following information:\n"
        const details =
            materials.map(d => `* ${d.name}: ${d.value}`).join("\n ")

        sendQuestionGPT(q + details).then(d => {
            console.log(d)
            setOpenDialog(true)
            setAnswer(d.choices[0].message.content)
            // qsAndAnswers[index] = {...d.choices[0], q: q}
            // setRetDataFromChatgpt({...d.choices[0], q: q}) // called two times to update the page with new data

            setLoading(false)

        })


    }

    function handleChanges(data) {
        materials[data.id] = {...data.material}
        setMaterials(materials)
    }


    function addEntry() {
        setMaterials(prevState => [...prevState, {
            name: "",
            value: ""
        }])

        console.log(materials)
    }

    function handleRemoveEntry(id) {

        const start = 0
        const end = materials.length
        if (id === start)
            setMaterials(materials.slice(1))
        else if (id === end - 1)
            setMaterials(materials.slice(start, end - 1))
        else setMaterials(
                materials.slice(start, id).concat(materials.slice(id + 1, end))
            )
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handelClick()
        }
    }

    return (<div className={styles.Home}>
        <div className={styles.Container}>
            <br/>
            <br/>
            <Container maxWidth="sm" sx={{bgcolor: '#ffffff', padding: '20px', borderRadius: "5px"}}>

                <Stack spacing={2}>
                    {materials.map((data, index) => (
                        <Entry_row key={index} id={index} onTextChange={handleChanges}
                                   value={data}
                                   onRemoveEntry={handleRemoveEntry}/>
                    ))}

                    <Stack direction={"row"} spacing={15}>

                        <Button variant={"contained"} color={"secondary"} onClick={addEntry}>Add Field</Button>
                        <Button variant={"contained"} onClick={handelClick}>Check!</Button>
                    </Stack>

                </Stack>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} color={"black"}>
                    <DialogTitle>
                        Result:
                    </DialogTitle>
                    <DialogContent>
                        <ResultPage data={answer}/>
                    </DialogContent>
                </Dialog>


            </Container>

            {loading && <CircularProgress style={{position: "fixed", top: "50%", left: "50%"}}/>}
        </div>
    </div>);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
