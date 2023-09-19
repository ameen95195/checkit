import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './entry_row.module.css';
import {Chip, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Label} from "@mui/icons-material";
import {wait} from "@testing-library/user-event/dist/utils";

const EntryRow = (props) => {

    const [material, setMaterial] = useState(props.value)

    useEffect(() => {
        setMaterial(props.value)
    }, [props.value])

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value


        if (name === "selectMaterial") {
            props.onTextChange(props.id, {...material, material: value})
            setMaterial(prevState => ({
                value: value === "" ? 0 : prevState.value,
                material: value,
            }))
        } else if (name === "value") {
            props.onTextChange(props.id, {...material, value: value})
            setMaterial(prevState => ({...prevState, value: value}))
        }

    }

    function handelRemove() {
        props.onRemoveEntry(props.id)
    }


    return (
        <div className={styles.EntryRow}>
            <Stack direction={"row"} spacing={2}>
                <Chip sx={{alignSelf: 'center'}} id={props.id} label={(props.id + 1)} color={"primary"}/>

                <FormControl sx={{m: 1, minWidth: 250}} size="medium">
                    <InputLabel id="demo-select-small-label">Material Name</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        value={material.material}
                        label="Material Name"
                        onChange={handleChange}
                        name="selectMaterial"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.materials.length === 0 ? "" : props.materials.map((mat, index) => {
                            return (
                                <MenuItem key={index} value={mat}>{mat.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>


                <TextField
                    variant={"outlined"}
                    disabled={material.material === ""}
                    id={props.id.toString()}
                    value={material.value}
                    label={"Value"}
                    name={"value"}
                    type={"number"}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position={"end"}> {material.material.isPercentage ? "%" : "mg"} </InputAdornment>
                    }}/>


                <Chip
                    disabled={props.id === 0}
                    sx={{alignSelf: 'center'}}
                    id={props.id} label={"Remove"}
                    cl
                    color={"error"}
                    onDelete={handelRemove}
                    onClick={handelRemove}/>


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
