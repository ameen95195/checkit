import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './entry_row.module.css';
import {Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Label} from "@mui/icons-material";
import {wait} from "@testing-library/user-event/dist/utils";

const EntryRow = (props) => {

    const [material, setMaterial] = useState({
        material: {},
        value: 0
    })

    function handleChange(e) {
        console.log(e)
        const name = e.target.name
        const value = e.target.value
        if (name === "selectMaterial" && value !== "")
            setMaterial(prevState => ({...prevState, material: value}))
        if (name === "value")
            setMaterial(prevState => ({...prevState, value: value}))
        console.log(material)
    }

    function handelRemove(id) {
        // const t = height / 10
        // setInterval
        // wait(300).then(r => {
        //
        // })

    }

    return (
        <div className={styles.EntryRow}>
            <Stack direction={"row"} spacing={2}>
                <Chip sx={{alignSelf: 'center'}} id={props.id} label={(props.id + 1)} color={"primary"}/>

                <FormControl sx={{m: 1, minWidth: 250}} size="medium">
                    <InputLabel id="demo-select-small-label">Material Name</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        value={material.material.name}
                        label="Material Name"
                        onChange={handleChange}
                        name="selectMaterial"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.materials.length === 0 ? "" : props.materials.map((mat, index) => {
                            console.log(mat)
                            return (
                                <MenuItem key={index} value={mat}>{mat.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>


                <TextField
                    variant={"outlined"}
                    id={"value: " + props.id}
                    value={material.value}
                    label={"Value"}
                    name={"value"}
                    type={"number"}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position={"end"}> {material.material.isPercentage? "%":"mg"} </InputAdornment>
                    }}/>

                {
                    props.id === 0 ? "" :
                        <Chip
                            sx={{alignSelf: 'center'}}
                            id={props.id} label={"Remove"}
                            cl
                            color={"error"}
                            onDelete={() => props.onRemoveEntry(props.id)}
                            onClick={() => props.onRemoveEntry(props.id)}/>

                }

            </Stack>
        </div>
    );
}
EntryRow.propTypes = {
    id: PropTypes.number.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onRemoveEntry: PropTypes.func.isRequired,
    value: PropTypes.object,
    materials: PropTypes.array.isRequired,
};

EntryRow.defaultProps = {
    materials: [],
    value: {
        material: {
            isPercentage: false,
            lower: -1,
            name: "",
            upper: -1,
        },
        value: 0
    }
};

export default EntryRow;
