import React, { FunctionComponent } from "react";
import { TodoItemProps, Item } from "../types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions
} from "@material-ui/core";
import { format } from "date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 12
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between"
    },
    editTextField: {
      width: "100%",
      marginTop: 16
    },
    dueDate: {
      fontStyle: "italic"
    }
  })
);

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  item,
  deleteItem,
  update,
  editableId,
  handleEditClicked
}) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [dueDate, setDueDate] = React.useState<string | null>("");
  const [completed, setCompleted] = React.useState(false);

  const deleteSelectedItem = (id: string) => deleteItem(id);
  const updateItem = () => {
    handleEditClicked("");
    console.log("dueDate");
    console.log(dueDate);
    const updatedItem: Item = {
      id: item.id,
      completed,
      title,
      text,
      dueDate
    };
    console.log(updatedItem);
    update(updatedItem);
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setText(item.text);
    setDueDate(item.dueDate === "" ? null : item.dueDate);
    setCompleted(item.completed);
    handleEditClicked(item.id);
  };

  const handleDateChanged = (inputDate: any) => {
    if (inputDate === null || inputDate === "") {
      setDueDate(null);
    } else {
      setDueDate(inputDate.toString());
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {editableId !== item.id && (
          <div>
            <Typography variant="h5" component="h5">
              {item.title}
            </Typography>
            <Typography component="p">
              {item.text}
              <br />
            </Typography>
            <Typography component="p" className={classes.dueDate}>
              Due date:{" "}
              {item.dueDate !== null && item.dueDate !== undefined
                ? format(new Date(item.dueDate), "dd.MM.yyyy @ kk:mm:ss")
                : "None"}
              <br />
            </Typography>
            <Typography color="textSecondary">
              {item.completed ? "Completed" : "Not completed"}
            </Typography>
          </div>
        )}
        {editableId === item.id && (
          <div className={` ${editableId === item.id ? "" : "removed"}`}>
            <TextField
              label="Edit title"
              variant="outlined"
              defaultValue={title}
              className={classes.editTextField}
              onChange={e => setTitle(e.target.value)}
            />
            <TextField
              label="Edit text"
              variant="outlined"
              defaultValue={text}
              multiline
              rows="5"
              className={classes.editTextField}
              onChange={e => setText(e.target.value)}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                className={classes.editTextField}
                disablePast={true}
                ampm={false}
                label="Due date"
                inputVariant="outlined"
                value={dueDate}
                onChange={handleDateChanged}
                clearable
              />
            </MuiPickersUtilsProvider>

            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={event => setCompleted(event.target.checked)}
                  name="completed"
                />
              }
              label="Completed"
            />
          </div>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Done
        </Button>
        {editableId !== item.id && (
          <Button size="small" color="primary" onClick={() => handleEdit(item)}>
            Edit
          </Button>
        )}

        {editableId === item.id && (
          <div>
            <Button variant="contained" color="primary" onClick={updateItem}>
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditClicked("")}
            >
              Cancel
            </Button>
          </div>
        )}

        <Button
          size="small"
          color="secondary"
          onClick={e => deleteSelectedItem(item.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItem;
