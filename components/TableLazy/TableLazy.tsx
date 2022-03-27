import { Checkbox } from '@material-ui/core';
import React, { useMemo, useRef, useState } from 'react';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import Cell from './Cell';
import Check from './Check';

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

const TableLazy: React.FC<PropsType> = ({ data, columns }: PropsType) => {
  const [bulkSelected, setBulkSelected] = useState<number[]>([])
  const [sort, setSort] = useState<{ key: string, sort: 'asc' | 'desc' }>({ key: '', sort: 'asc' })
  const [search, setSearch] = useState<{ key: string, txt: string }>({ key: '', txt: '' })
  const searchTimeout = useRef(null);

  const getData = useMemo(() => {
    if (!data.length) return []

    const keys = Object.keys(data[0]);
    return data.filter(item => {
      if (!search.txt) return item;

      for (const key of keys) {
        const value = String(item[key]).toLocaleLowerCase();
        const searchTxt = search.txt;
        const validate = value === searchTxt || value.includes(searchTxt);
        if (validate) return true;
      }
      return false;
    }).sort((a, b) => {
      if(!sort.key) return 0;

      if(sort.sort === 'asc'){
        return a[sort.key] > b[sort.key] ? 1 : -1;
      }
      return a[sort.key] > b[sort.key] ? -1 : 1;
    });
  }, [data, search, sort])

  const handleSearch = (event) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    };

    searchTimeout.current = setTimeout(() => {
      setSearch((value) => {
        return { ...value, txt: event.target.value.toLocaleLowerCase() };
      })
    }, 1000)
  }

  const handleSort = ({dataKey}) => {
    setSort((value) => {
      const newSort = !value.key ? 'asc' :
                      value.sort === 'asc' ? 'desc' : 'asc';
      return {key: dataKey, sort: newSort}
    })
  }

  const handleBulkSelect = (value) => setBulkSelected((items) => {
    const index = items.indexOf(value);
    if(index > -1) {
      items.splice(index, 1);
    }else{
      items.push(value)
    }
    console.log('items', items)
    return items;
  })

  return (<div className="Hola">
    <input placeholder="Buscar" onChange={handleSearch} />
    <Table
      width={900}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={getData.length}
      rowGetter={({ index }) => getData[index]}
      className="table-lazy-data"
      onHeaderClick={handleSort}
    >
      <Column label="x" dataKey="id" width={40} cellRenderer={({cellData}) => {
        return <Check id={cellData} checked={bulkSelected.includes(cellData)} check={handleBulkSelect} />;
      }} />
      {columns.map((item) => <Column
        key={item.name}
        dataKey={item.name}
        label={item.label}
        width={100}
        cellRenderer={(args) => <Cell {...args} options={item.options} />}
        options={item.options}
        className="table-lazy-row"
      />)}
    </Table>
    Total: {data.length}
  </div>);
};

export default TableLazy;
