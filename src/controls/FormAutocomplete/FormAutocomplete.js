import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Select, { createFilter } from "react-select";
import FormHelperText from "@material-ui/core/FormHelperText";
import styled from "styled-components";
import { FormControl, InputLabel } from "@material-ui/core";

const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    display: block;
    position: relative;
  }
`;

const StyledAutoSelectInputLabel = styled(InputLabel)`
  && {
    position: relative;
    .req-label {
      color: #f44336;
    }
    transform: translate(0, 1.5px) scale(0.75);
    transform-origin: top left;
  }
`;

const stylesReactSelect = {
  clearIndicator: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    margin: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: state.selectProps.error ? "#f44336" : "rgba(0, 0, 0, 0.54)",
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    border: 0,
    borderBottom: state.selectProps.error
      ? "1px solid #f44336"
      : "1px solid rgba(0,0,0,0.87)",
    boxShadow: "none",
    ":hover": {
      borderColor: state.selectProps.error ? "1px solid #f44336" : "inherit",
      boxShadow: state.selectProps.error ? "1px solid #f44336" : "none",
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
  }),
};

const components = {
  Option,
};

function Option(props) {
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps;
  return (
    <div {...newInnerProps} className="autoselect-options">
      {props.children}
    </div>
  );
}

const ReactSelect = (props) => {
  const { label, options, required, errorobj, name, placeholder } = props;
  let isError = false;
  let errorMessage = "";
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <React.Fragment>
      <StyledFormControl>
        <Select
          options={options}
          placeholder={placeholder}
          valueKey="id"
          components={components}
          isClearable={true}
          styles={stylesReactSelect}
          isSearchable={true}
          filterOption={createFilter({ ignoreAccents: false })}
          error={isError}
          {...props}
        />
        {isError && (
          <FormHelperText error={isError}>{errorMessage}</FormHelperText>
        )}
      </StyledFormControl>
    </React.Fragment>
  );
};

function FormAutocomplete(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const newOptions = options.map((data, index) => ({
      label: data.label,
      value: data.id,
    }));
    setNewData(newOptions);
  }, [options]);

  return (
    <React.Fragment>
      <Controller
        render={({field}) => (
            <ReactSelect 
            label={label}
            name={name}
            defaultValue=""
            defaultValue={[]}
            options={newData}
            isMulti
            {...field}
            {...props}
            ref={null}
            />
        )}
        name={name}
        control={control}
        label={label}
      />
    </React.Fragment>
  );
}

export default FormAutocomplete;