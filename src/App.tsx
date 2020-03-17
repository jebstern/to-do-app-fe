import React from "react";
import List from "./List";
import "./App.css";
import { isOverdue } from "./utils";
import todoApi from "./api";
import Header from "./Header";
import { Item } from "./types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

const defaultFilter = { overdueOnly: false, includeComplete: false };

function App() {
  const defaultItems: Item[] = [];

  const [items, setItems] = React.useState(defaultItems);
  const [filter, setFilter] = React.useState(defaultFilter);
  const [loading, setLoading] = React.useState(true);

  const loadItems = async () => {
    setLoading(true);
    const todoItems = await todoApi.get();
    setItems(todoItems);
    setLoading(false);
  };

  React.useEffect(() => {
    loadItems();
  }, []);

  const add = async (item: Item) => {
    const updatedItems = await todoApi.add(item);
    setItems(updatedItems);
  };

  const filteredItems = items.filter(
    item =>
      (filter.includeComplete || !item.complete) &&
      (!filter.overdueOnly || isOverdue(item))
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Container id="base-container" maxWidth="xl">
        <Header addItem={add} filter={filter} setFilter={setFilter} />
        {!loading && (
          <div className="list">
            <List items={filteredItems} />
          </div>
        )}
        {loading && <CircularProgress />}
      </Container>
    </React.Fragment>
  );
}

export default App;
