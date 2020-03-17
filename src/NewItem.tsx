import React, { FunctionComponent } from "react";
import { NewItemProps } from "./types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      }
    }
  })
);

export const NewItem: FunctionComponent<NewItemProps> = ({ add }) => {
  const classes = useStyles();

  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date !== null) {
      setDate(date);
    }
  };

  const addItem = () => {
    const dueDate = new Date(date);
    add({ title, timestampDue: dueDate.getTime(), complete: false, id: 0 });
  };
  return (
    <div className="add-item-form">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="addItemInput"
          label="Description"
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Due date"
            format="dd.MM.yyyy"
            inputVariant="outlined"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
              <Button
        variant="contained"
        color="primary"
        onClick={addItem}
        disabled={title === ""}
      >
        Add item
      </Button>
      </form>

    </div>
  );
};

export default NewItem;
