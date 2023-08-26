import React, {useEffect, useState} from 'react';
import styles from './AddMaterial.module.css';
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
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
        console.log(constrains)

        setConstrains(prevState => ({
            ...prevState, [objName]: value
        }))
    }

    function handelClick() {
        // console.log(addQ("s").then((d) => console.log(d)))
        if (materialName.trim() !== "" && checkConstrains()) {
            if (window.confirm("Are you sure!!!") === true) addQ(materialName, constrains, isPercentage).then(r => {
                console.log(r)
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
        <table className={styles.container}>
            <tbody>
            <tr>
                <td>
                    <strong>Material Name</strong>
                </td>
                <td colSpan={2}>
                    <TextField onChange={handelChange} fullWidth id="title" onKeyDown={handelKeyDown}
                               label="Material Name" value={materialName}
                               variant="standard"/>
                </td>

            </tr>

            <tr>
                <td>
                    <strong>Value</strong>
                </td>
                <td>
                    <TextField onChange={(e) => handelChangeConst("lower", e.target.value)} onKeyDown={handelKeyDown}
                               label="Lower"
                               variant="standard" type={"number"} value={constrains.lower}/>
                </td>
                <td>
                    <TextField onChange={(e) => handelChangeConst("upper", e.target.value)} onKeyDown={handelKeyDown}
                               label="Upper"
                               variant="standard" type={"number"} value={constrains.upper}/>
                </td>
            </tr>

            <tr>
                <td style={{display: "inline-flex", justifyContent: "center", alignItems:"center"}} colSpan={2} rowSpan={2} align={"center"}>
                    <strong>Is percentage: %</strong> <Checkbox onChange={(event) => {
                    setIsPercentage(event.target.checked)
                }}/>
                </td>

            </tr>

            <tr>
                <td></td>
                <td></td>
                <td>
                    <Button color="secondary" onClick={handelClick} variant="contained">Add Material</Button>
                </td>
            </tr>
            </tbody>
        </table>

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
