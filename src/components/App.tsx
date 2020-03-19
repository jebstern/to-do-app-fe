import React from "react";
import List from "./List";
import "../App.css";
import todoApi from "../api/";
import { Item } from "../types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import NewItem from "./NewItem";
import Filters from "./Filters";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

function App() {
  const defaultItems: Item[] = [];

  const [items, setItems] = React.useState(defaultItems);
  const [includeCompleted, setIncludeCompleted] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [isNewItemLoading, setNewItemLoading] = React.useState(false);

  const loadItems = async () => {
    setLoading(true);
    console.log("loadItems");
    console.log(includeCompleted);
    const todoItems = includeCompleted
      ? await todoApi.getAll()
      : await todoApi.getIncomplete();
    setItems(todoItems);
    setLoading(false);
  };

  React.useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeCompleted]);

  const add = async (item: Item) => {
    setNewItemLoading(true);
    await todoApi
      .add(item)
      .then(res => {
        console.log(res.data);
        setItems(items.concat([res.data]));
      })
      .catch(error => console.log(error));
    setNewItemLoading(false);
  };

  const update = async (item: Item) => {
    await todoApi
      .update(item)
      .then(res => {
        console.log(res.data);
        const index = items.findIndex(oldItem => oldItem.id === item.id);
        console.log("index:" + index)
      
        const obj = JSON.stringify(items)
        let cloned = JSON.parse(obj);
        cloned[index] = res.data
        console.log(cloned)
        setItems(cloned)
      })
      .catch(error => console.log(error));
  };

  const deleteItem = async (id: string) => {
    await todoApi
      .deleteItem(id)
      .then(res => {
        if (res.status === 204) {
          setItems(items.filter(item => item.id !== id));
        }
      })
      .catch(e => console.log(e));
  };

  const handleCompletedChanged = async (item: Item) => {
    setIncludeCompleted(!includeCompleted);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container id="base-container" maxWidth="lg">
        <Typography variant="h1" gutterBottom align="center">
          Todo list
        </Typography>
        <NewItem add={add} />
        <Filters
          includeCompleted={includeCompleted}
          handleCompletedChanged={handleCompletedChanged}
        />
        <Divider variant="fullWidth" />
        {!loading && (
          <div className="list">
            <List
              items={items}
              newItemLoading={isNewItemLoading}
              deleteItem={deleteItem}
              update={update}
            />
          </div>
        )}
        {loading && <CircularProgress />}
      </Container>
    </React.Fragment>
  );
}

export default App;
