import React, { FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ListItemProps, Item } from "../types";
import { CircularProgress, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
      width: "80%",
      maxWidth: 680
    },
    noItems: {
      marginLeft: 12,
      marginTop: 8
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between"
    },
    editTextField: {
      width: "100%",
      marginTop: 8
    },
    itemText: {
      marginBottom: 8
    }
  })
);

export const List: FunctionComponent<ListItemProps> = ({
  items,
  newItemLoading,
  deleteItem,
  update
}) => {
  const classes = useStyles();
  const [isEditing, setEditing] = React.useState(false);
  const [editItemId, setEditItemId] = React.useState("");
  const [input, setInput] = React.useState("");
  const deleteSelectedItem = (id: string) => deleteItem(id);
  const updateItem = () => {
    setEditing(!isEditing);
    update(JSON.parse(input));
  };

  let handleEdit = (item: any) => {
    setInput(JSON.stringify(item, null, 2));
    setEditItemId(item.id);
    setEditing(true);
  };

  let html;
  if (items.length === 0) {
    html = (
      <Typography variant="h5" gutterBottom>
        No items, empty list!
      </Typography>
    );
  } else {
    html = items.map((item: Item) => (
      <Card className={classes.root} key={item.id}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary" className={classes.itemText}>
            {item.text}
            <br />
          </Typography>
          {!isEditing &&
            <Typography variant="body2" component="p">
              {JSON.stringify(item, null, 2)}
            </Typography>
          }
          {editItemId === item.id && (
            <div className={` ${isEditing ? "" : "removed"}`}>
              <TextField
                label="Edit item"
                variant="outlined"
                defaultValue={input}
                multiline
                id={item.id}
                rows="5"
                className={classes.editTextField}
                onChange={e => setInput(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary">
            Done
          </Button>
          {(!isEditing || editItemId !== item.id) && (
            <Button
              size="small"
              color="primary"
              onClick={() => handleEdit(item)}
            >
              Edit
            </Button>
          )}

          {isEditing && editItemId === item.id && (
            <div>
              <Button variant="contained" color="primary" onClick={updateItem}>
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setEditing(!isEditing)}
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
    ));
  }

  return (
    <div className={classes.noItems}>
      {html}
      {newItemLoading && (
        <div>
          <p>Adding new item</p>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default List;
