import React, { useMemo, useRef, useState } from 'react';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

type ColumnType = {
  name: string;
  label: string;
  options?: {
    customRender(arg0: {
      cellData: any,
      rowIndex: number
      rowData: any, dataKey: string
    }): any;
  }
}

type PropsType = {
  data: { [key: string]: any },
  // options: {}
  columns: ColumnType[]
}

const TableLazy: React.FC<PropsType> = ({data, columns}: PropsType) => {
  if (typeof window !== 'undefined') {
    return <> </>
  }
  return (<div className="Hola">
  {/* <input placeholder="Buscar" onChange={handleSearch} /> */}
  <Table
    width={900}
    height={300}
    headerHeight={20}
    rowHeight={30}
    rowCount={data.length}
    rowGetter={({ index }) => data[index]}
    className="table-lazy-data"
    // onHeaderClick={handleSort}
  >
    {/* <Column label="x" dataKey="id" width={40} cellRenderer={({cellData}) => {
      return <Check id={cellData} checked={bulkSelected.includes(cellData)} check={handleBulkSelect} />;
    }} /> */}
    {columns.map((item) => <Column
      key={item.name}
      dataKey={item.name}
      label={item.label}
      width={100}
      // cellRenderer={(args) => <Cell {...args} options={item.options} />}
      options={item.options}
      className="table-lazy-row"
    />)}
  </Table>
  Total: {data.length}
</div>);
};

export default TableLazy;
