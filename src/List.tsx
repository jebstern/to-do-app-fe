import React, { FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ListItemProps, Item } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(3),
      width: "80%",
      maxWidth: 680
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })
);

export const List: FunctionComponent<ListItemProps> = ({ items }) => {
  const classes = useStyles();

  if (items.length === 0) {
    return (
      <div className="alert alert-success" role="alert">
        Congratulations your todo list is empty!
      </div>
    );
  }
  return (
    <ul className="list-group">
      {items.map((item: Item) => (
        <Card className={classes.root} key={item.id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" component="p">
              {JSON.stringify(item, null, 2)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">Complete</Button>
            <Button size="small" color="secondary">Archive</Button>
          </CardActions>
        </Card>
      ))}
    </ul>
  );
};

export default List;
