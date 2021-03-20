import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import "../styles/app.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

function Dropdown({ name, label, selection, setSelection, fetchData }) {
  const classes = useStyles();
  const { status, data, error } = fetchData();

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor={`${name}-select-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-select-label`}
            id={`${name}-select`}
            label={label}
            value={selection}
            onChange={handleChange}
          >
            {data.map((item) => (
              <MenuItem key={item.Route} value={item.Route}>
                {item.Description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

export default Dropdown;
