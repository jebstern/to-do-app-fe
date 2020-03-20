import React, { FunctionComponent } from "react";
import { NewItemProps } from "../types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%"
    }
  })
);

export const NewItem: FunctionComponent<NewItemProps> = ({ add }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => setDate(date);

  const addItem = () => {
    const dueDate = date !== null ? date.getTime() : null;
    add({ title, text, dueDate, completed: false, id: "" });
  };

  return (
    <form noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <TextField
            id="addItemInput"
            label="Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
          <TextField
            id="addItemInput2"
            label="Text"
            variant="outlined"
            value={text}
            onChange={e => setText(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              className={classes.root}
              disablePast={true}
              ampm={false}
              label="Due date"
              inputVariant="outlined"
              value={date}
              onChange={handleDateChange}
              clearable
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
          <Button
            variant="contained"
            color="primary"
            id="add-btn"
            onClick={addItem}
            disabled={title === ""}
          >
            Add item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewItem;
