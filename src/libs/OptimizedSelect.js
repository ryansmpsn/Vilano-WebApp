import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";

export default class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * 35;

    return (
      <List height={maxHeight} itemCount={children.length} itemSize={55} initialScrollOffset={initialOffset}>
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
