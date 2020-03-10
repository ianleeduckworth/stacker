import * as React from "react";
import Cell from "./Cell";

export interface RowProps {
  color?: string;
  selectedCells?: boolean[];
  rowNumber: number;
}

class Row extends React.Component<RowProps> {
  render() {
    const { color, selectedCells } = this.props;
    let cells = selectedCells as boolean[];
    if (!selectedCells) {
      cells = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
    }

    return (
      <div className="row">
        <Cell color={color ?? "black"} selected={cells[0]} />
        <Cell color={color ?? "black"} selected={cells[1]} />
        <Cell color={color ?? "black"} selected={cells[2]} />
        <Cell color={color ?? "black"} selected={cells[3]} />
        <Cell color={color ?? "black"} selected={cells[4]} />
        <Cell color={color ?? "black"} selected={cells[5]} />
        <Cell color={color ?? "black"} selected={cells[6]} />
        <Cell color={color ?? "black"} selected={cells[7]} />
        <Cell color={color ?? "black"} selected={cells[8]} />
        <Cell color={color ?? "black"} selected={cells[9]} />
        <Cell color={color ?? "black"} selected={cells[10]} />
        <Cell color={color ?? "black"} selected={cells[11]} />
      </div>
    );
  }
}

export default Row;
