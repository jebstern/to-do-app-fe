import React, { FunctionComponent } from "react";
import { isOverdue } from "./utils";
import { ItemProps } from "./types";

export const Item: FunctionComponent<ItemProps> = ({ item }) => {
  const itemClass = `list-group-item list-group-item-${
    isOverdue(item) ? "danger" : "info"
  }`;
  return (
    <li className={itemClass}>
      <div className="item">
        <span className={`item-title${item.complete ? " complete-item" : ""}`}>
          <i className={isOverdue(item) ? "fas fa-exclamation-circle" : ""} />
          {`${item.title} - ${new Date(item.timestampDue)}`}
        </span>
        {!item.complete && (
          <button type="button" className="btn btn-link">
            Complete item
          </button>
        )}
      </div>
    </li>
  );
};

export default Item