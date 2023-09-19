import React, {useEffect, useState} from 'react';
import styles from './AddMaterial.module.css';
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {AddRounded, CheckBox, Delete} from "@mui/icons-material";
import {addQ, deleteQ, getAllQ} from "../../utils/firebase-actions";

const AddMaterial = () => {
    const [constrains, setConstrains] = useState({
        lower: 0, upper: 0
    })
    const [isPercentage, setIsPercentage] = useState(false);

    const [id, setId] = useState()
    const [materialName, setMaterialName] = useState("")
    const [addedData, setAddedData] = useState([])


    useEffect(() => {
        getAllQ().then(data => {
            setAddedData(data)
        })
    },[])

    function handelChange(e) {
        setMaterialName(e.target.value);
    }

    function handelChangeConst(objName, value) {

        setConstrains(prevState => ({
            ...prevState, [objName]: value
        }))
    }

    function handelClick() {
        if (materialName.trim() !== "" && checkConstrains()) {
            if (window.confirm("Are you sure!!!") === true) addQ(materialName, constrains, isPercentage).then(r => {
                getAllQ().then(data => {
                    setAddedData(data)
                })
            })
        }
    }

    function handelDelete(id) {
        if (window.confirm("Are you sure!!!") === true) {
            deleteQ(id).then(() => {
                getAllQ().then(data => {
                    setAddedData(data)
                })
            })
        }
    }

    function checkConstrains() {
        if (parseFloat(constrains.lower) > parseFloat(constrains.upper)) {
            alert("Error!!... ''Lower'' should be smaller than Upper ")
            return false
        }
        if (parseFloat(constrains.upper) > 100 && isPercentage){
            alert("Error!!... ''Upper'' should be <= 100% ")
            return false
        }

        return true;
    }

    function handelKeyDown(e) {
        if (e.key === "Enter") {
            handelClick()
        }
    }

    return (<div className={styles.AddQuestion}>
        <div className={styles.container}>
            <Grid container spacing={3} sx={{alignItems: "center", padding: "5px"}}>
                <Grid xs={4}>
                    <strong>Material Name</strong>
                </Grid>
                <Grid xs={8}>
                    <TextField onChange={handelChange} fullWidth id="title" onKeyDown={handelKeyDown}
                               label="Material Name" value={materialName}
                               variant="standard"/>
                </Grid>
                <Grid xs={4}>
                    <strong>Value</strong>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={(e) => handelChangeConst("lower", e.target.value)} onKeyDown={handelKeyDown}
                               label="Lower"
                               variant="standard" type={"number"} value={constrains.lower}/>
                </Grid>
                <Grid xs={4}>
                    <TextField onChange={(e) => handelChangeConst("upper", e.target.value)} onKeyDown={handelKeyDown}
                               label="Upper"
                               variant="standard" type={"number"} value={constrains.upper}/>
                </Grid>

                <Grid xs={4}>
                    <strong>Is percentage: %</strong> <Checkbox onChange={(event) => {
                    setIsPercentage(event.target.checked)
                }}/>                </Grid>

                <Grid xs={8}>
                    <Button color="secondary" onClick={handelClick} variant="contained">Add Material</Button>
                </Grid>
            </Grid>
        </div>

        <br/>
        <br/>
        <br/>

        {addedData.length !== 0 && <div className={styles.container}>
            <table style={{width: "100%"}} className={styles.BorderTable}>
                <thead>
                <tr style={{fontSize: "18px", fontWeight: "bolder"}}>
                    <td>
                        Name
                    </td>
                    <td>
                        Lower Value
                    </td>
                    <td>
                        Upper Value
                    </td>
                    <td>
                        Action
                    </td>
                </tr>
                </thead>

                <tbody>
                {addedData.map((d, index) => (
                    <tr>
                        <td>{d.data().name}</td>
                        <td>{d.data().lower} {d.data().isPercentage? "%": ""}</td>
                        <td>{d.data().upper} {d.data().isPercentage? "%": ""}</td>
                        <td><IconButton onClick={() => handelDelete(d.id)}><Delete/></IconButton></td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>

        }
    </div>);
}


export default AddMaterial;
