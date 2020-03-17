import React, { FunctionComponent } from "react";

import NewItem from "./NewItem";
import { HeaderProps } from "./types";
import Typography from "@material-ui/core/Typography";
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

export const Header: FunctionComponent<HeaderProps> = ({
  filter,
  addItem,
  setFilter
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    overdueOnly: false,
    includeComplete: true
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { overdueOnly, includeComplete } = state;

  const addNewItem = (item: any) => {
    addItem(item);
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Todo list
      </Typography>
      <NewItem add={addNewItem} />
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Filter items</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={overdueOnly}
                onChange={handleChange("overdueOnly")}
                value="overdueOnly"
              />
            }
            label="Overdue only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeComplete}
                onChange={handleChange("includeComplete")}
                value="includeComplete"
              />
            }
            label="Include complete"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Header;
