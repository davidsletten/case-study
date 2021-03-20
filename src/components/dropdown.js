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
  fetchData,
  fetchParams,
}) {
  const classes = useStyles();
  const { status, data, error } = fetchData(fetchParams);

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
  name: PropTypes.string,
  label: PropTypes.string,
  selection: PropTypes.string,
  setSelection: PropTypes.func,
  fetchData: PropTypes.func,
  menuItem: PropTypes.func,
  parentValue: PropTypes.string,
};

export default Dropdown;
