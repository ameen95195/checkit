import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './entry_row.module.css';
import {Chip, InputAdornment, Stack, TextField} from "@mui/material";
import {Label} from "@mui/icons-material";
import {wait} from "@testing-library/user-event/dist/utils";

const EntryRow = (props) => {

    const [material, setMaterial] = useState({
        name: "",
        value: ""
    })

    useEffect(() => {
        if (props.onTextChange)
            props.onTextChange({
                id: props.id,
                material: material
            })
    }, [material.name, material.value])

    useEffect(() => {
        if (props.value.name !== "" || props.value.value !== ""){
            setMaterial(props.value)
        }
    }, [props.value.name, props.value.value])

    function handelChange(e) {
        setMaterial(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }))
    }

    function handelRemove(id) {
        // const t = height / 10
        // setInterval
        // wait(300).then(r => {
        //
        // })

    }

    return (
        <div className={styles.EntryRow}  >
            <Stack direction={"row"} spacing={2}>
                <Chip sx={{alignSelf: 'center'}} id={props.id} label={(props.id + 1)} color={"primary"}/>

                <TextField
                    variant={"outlined"}
                    id={"name: " + props.id}
                    value={material.name}
                    label={"Component Name"}
                    name={"name"}
                    onChange={handelChange}/>

                <TextField
                    variant={"outlined"}
                    id={"value: " + props.id}
                    value={material.value}
                    label={"Value"}
                    name={"value"}
                    type={"number"}
                    onChange={handelChange}
                    InputProps={{
                        endAdornment: <InputAdornment position={"end"}> mg </InputAdornment>
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
};

EntryRow.defaultProps = {
    value: {
        name: "",
        value: ""
    }
};

export default EntryRow;
