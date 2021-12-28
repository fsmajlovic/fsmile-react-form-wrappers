import React from "react";
import Button from "@material-ui/core/Button";

export const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
    style={{marginTop: "20px"}}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};