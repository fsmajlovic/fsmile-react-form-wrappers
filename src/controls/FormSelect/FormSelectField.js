import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";


import styled from "styled-components";
import { InputLabel } from "@material-ui/core";

const StyledInputLabel = styled(InputLabel)`
  && {
    .req-label {
      color: #f44336;
    }
  }
`;

const MuiSelect = (props) => {
  const { name, options, errorobj } = props;
  let error = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    error = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl fullWidth={true} error={error}>
      <StyledInputLabel htmlFor={name}>
        {name} 
      </StyledInputLabel>
      <Select id={name} {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

function FormSelect(props) {
  const { control } = useFormContext();
  const { name, label } = props;
  return (
    <React.Fragment>
      <Controller
      render={({field}) => (
            <MuiSelect 
            label={label}
            name={name}
            defaultValue=""
            {...field}
            {...props}
            ref={null}
            />
         )}
        control={control}
        name={name}
      />
    </React.Fragment>
  );
}

export default FormSelect;