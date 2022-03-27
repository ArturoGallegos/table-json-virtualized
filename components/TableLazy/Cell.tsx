import React from 'react';

interface Cell {
  cellData: any,
  rowIndex: number
  rowData: any,
  columnData: any,
  columnIndex: number,
  dataKey: string,
  isScrolling: boolean,
}

interface PropsType extends Cell {
  options: {
    customRender(arg0: Partial<Cell>): any;
  }
}

const Cell: React.FC<PropsType> = ({ cellData, rowData, dataKey, rowIndex, options }: PropsType) => {
  if (options && options.customRender) return <>{options.customRender({ cellData, rowData, dataKey, rowIndex })}</>;

  return (<>
    {cellData}
  </>);
};

export default Cell;
