import React, { FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ListItemProps, Item } from "../types";
import { CircularProgress } from "@material-ui/core";
import TodoItem from "./TodoItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 8
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
  const [editItemId, setEditItemId] = React.useState("");

  const handleEditClicked = (id: string) => setEditItemId(id);

  return (
    <div className={classes.root}>
      {items.length === 0 && (
        <Typography variant="h5" gutterBottom align="center">
          No items yet, add one above.
        </Typography>
      )}

      {items.length > 0 &&
        items.map((item: Item) => (
          <TodoItem
            item={item}
            deleteItem={deleteItem}
            update={update}
            key={item.id}
            editableId={editItemId}
            handleEditClicked={handleEditClicked}
          />
        ))}

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
