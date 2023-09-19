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
import {Add, Label, SearchRounded} from "@mui/icons-material";
import {sendQuestionGPT} from "../../utils/chatGPT-api";
import {getAllMaterials, getAllQ} from "../../utils/firebase-actions";
import ResultPage from "../ResultPage/ResultPage";
import saudi_flag from "../../saudi_flag.png"
import Entry_row from "../../views/entry_row/entry_row";
import {preTextGPTExplination} from "../../utils/consts";
import EntryRow from "../../views/entry_row/entry_row";
import ResultDialog from '../../views/result_dialog/result_dialog';

export const FOOD = 0
export const HEALTH = 1
export const MEDICINE = 2

const Home = () => {
    const [result, setResult] = useState({})
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState("")
    const [materials, setMaterials] = useState([{
        name: "",
        value: ""
    }])
    const [selectedMaterials, setSelectedMaterials] = useState([{
        material: {},
        value: 0
    }])


    useEffect(() => {
        getAllMaterials().then(data => {
            setMaterials(data)
        })
    }, [])


    function handelChange(e) {
    }

    function checkEntries(){
        if (productName === "") return false
        return true
    }


    function handelSubmit() {
        if (!checkEntries) {
            alert("please enter product name!")
            return;
        }
        const filterdSelectedMat = selectedMaterials.filter((v) =>
            (v.value !== 0 && v.material.upper !== undefined)
        )
        const checkedMatCategory = checkAllAddedMaterials(filterdSelectedMat)
        setResult( {
            row: checkedMatCategory,
            res: decideProductCategory(checkedMatCategory),
            productName: productName,
        })

        setOpenDialog(true)
        

    }

    function handleChanges(id, data) {
        selectedMaterials[id] = data
        setSelectedMaterials(selectedMaterials)
    }


    function addEntry() {
        setSelectedMaterials(prevState => [...prevState, {material: {}, value: 0}])
    }

    function handleRemoveEntry(id) {
        setSelectedMaterials(prevState =>
            prevState.filter((v, index) => id !== index))
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handelSubmit()
        }
    }

    // return [of checkd materials]
    function checkAllAddedMaterials(addedMaterials) {
        return addedMaterials.map((data, index) => ({
            checkedMat: checkMaterialCategory(data, data.material), material: data
        }))
    }

    /**
     * check if entered material value with constrained upper and lower
     * if return is 0: then its food category
     * if 1: then its health product
     * if 2: its medicine */
    function checkMaterialCategory(material, constrain) {
        if (parseFloat(material.value) >= parseFloat(constrain.upper))
            return MEDICINE
        if (parseFloat(material.value) >= parseFloat(constrain.lower))
            return HEALTH
        return FOOD
    }

    function decideProductCategory(lsOfIdsAndCheckedMatCat) {
        let isHealth = false;
        for (let i = 0; i < lsOfIdsAndCheckedMatCat.length; i++) {
            if (lsOfIdsAndCheckedMatCat[i].checkedMat === MEDICINE)
                return MEDICINE
            if (lsOfIdsAndCheckedMatCat[i].checkedMat === HEALTH)
                isHealth = true
        }
        return isHealth ? HEALTH : FOOD
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
                    <Stack direction={"column"} spacing={2}>
                        {selectedMaterials.map((data, index) => (
                            <>
                                <EntryRow
                                    key={index}
                                    id={index}
                                    onTextChange={handleChanges}
                                    onRemoveEntry={handleRemoveEntry}
                                    materials={materials}
                                    value={data}
                                />
                            </>
                        ))}

                        <div style={{width: "90%", textAlign: "right"}}>
                            <IconButton onClick={addEntry} color={"secondary"} sx={{alignItems: "right"}}
                                        aria-label="Add Material" size="large" >
                                <Add/>
                            </IconButton>
                        </div>
                    </Stack>

                    <br/> <br/> <br/>
                    <Button onClick={handelSubmit} variant={"contained"}>Get result</Button>

                </div>

            </Container>
            
            <ResultDialog onClose={setOpenDialog} result={result} open={openDialog} />

            {loading && <CircularProgress style={{position: "fixed", top: "50%", left: "50%"}}/>}
        </div>
    </div>);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
