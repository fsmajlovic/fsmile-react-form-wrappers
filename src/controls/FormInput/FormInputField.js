import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

function FormInputField(props) {
  const { control } = useFormContext();
  const { name, errorobj } = props;
  let error = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    error = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      render={({ field }) => (
            <TextField
            {...field}
            name={name}
            label={name}
            fullWidth={true}
            error={error}
            helperText={errorMessage}
            />
        )}
      name={name}
      control={control}
    />
  );
}

export default FormInputField;
