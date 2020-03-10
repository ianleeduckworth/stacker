import * as React from "react";
import "./Cell.scss";
import "./Board.scss";

export interface CellProps {
  selected?: boolean;
  color?: string;
}

class Cell extends React.Component<CellProps> {
  render() {
    const { selected = false, color } = this.props;

    let className = "col-1 cell-box ";
    if (selected) {
      className += color;
    }

    return <div className={className}></div>;
  }
}

export default Cell;
