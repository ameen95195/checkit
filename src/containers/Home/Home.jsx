import React, {useEffect, useState} from 'react';
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
import {getAllMaterials, getAllQ} from "../../utils/firebase-actions";
import ResultPage from "../ResultPage/ResultPage";
import saudi_flag from "../../saudi_flag.png"
import Entry_row from "../../views/entry_row/entry_row";
import {preTextGPTExplination} from "../../utils/consts";
import EntryRow from "../../views/entry_row/entry_row";


const Home = () => {
    const [answer, setAnswer] = useState("")
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState("")
    const [materials, setMaterials] = useState([{
        name: "",
        value: ""
    }])


    useEffect(() => {
        getAllMaterials().then(data => {
            setMaterials(data)
        })
    }, [])


    function handelChange(e) {
    }


    function handelClick() {


    }

    function handleChanges(id, data) {

    }


    function addEntry() {

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

    /**
     * check if entered material value with constrained upper and lower
     * if return is 0: then its food category
     * if 1: then its health product
     * if 2: its medicine */
    function checkMaterialCategory(material, constrain){
        if (parseFloat(material.value) > parseFloat(constrain.upper))
            return 2
        if (parseFloat(material.value) > parseFloat(constrain.lower))
            return 1
        return 0
    }

    function decideProductCategory(lsOfIdsAndCheckedMatCat){

    }

    return (<div className={styles.Home}>
        <div className={styles.Container}>
            <br/>
            <br/>
            <Container maxWidth="md" sx={{bgcolor: '#ffffff', padding: '20px', borderRadius: "5px"}}>
                <div>
                    <div>
                        <TextField sx={{width: 250}}
                            onChange={(e) => {
                                setProductName(e.target.value)
                            }}
                            fullWidth id="title"
                            label="Product Name" value={productName}
                            variant="standard"/>
                    </div>

                    <br/><br/>
                    <EntryRow
                        id={0}
                        onTextChange={(id, material) => handleChanges(material)}
                        onRemoveEntry={() => {
                        }}
                        materials={materials}
                    />
                </div>

            </Container>

            {loading && <CircularProgress style={{position: "fixed", top: "50%", left: "50%"}}/>}
        </div>
    </div>);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
