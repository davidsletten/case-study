import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    minWidth: 300,
  },
}));

function Dropdown({
  name,
  label,
  menuItem,
  selection,
  setSelection,
  optionData,
}) {
  const classes = useStyles();
  const { status, data, error } = optionData;
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
            {data.map(menuItem)}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  menuItem: PropTypes.func.isRequired,
  selection: PropTypes.string.isRequired,
  setSelection: PropTypes.func.isRequired,
  optionData: PropTypes.object.isRequired,
};

export default Dropdown;
