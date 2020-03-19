import React, { FunctionComponent } from "react";
import { FilterProps } from "../types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    formControl: {
      margin: theme.spacing(3)
    }
  })
);

export const Filters: FunctionComponent<FilterProps> = ({
  handleCompletedChanged,
  includeCompleted
}) => {
  const classes = useStyles();
  const handleChange = () => handleCompletedChanged()
  

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">Filter items</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeCompleted}
              onChange={handleChange}
              value="includeComplete"
            />
          }
          label="Include complete"
        />
      </FormGroup>
    </FormControl>
  );
};

export default Filters;
