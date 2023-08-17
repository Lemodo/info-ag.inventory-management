import React, { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import MyCreateModal from './MyCreateModal';

export default function Database({ columns }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [createModalShow, setCreateModalShow] = React.useState(false);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API)
      .then(res => {
        setData(res.data);
        console.log("loaded" + res.data);
        setIsLoading(false); // Data is now loaded
      })
      .catch(err => console.log(err));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <Button className='mt-2' variant="secondary" onClick={() => setCreateModalShow(true)}>
        Create
      </Button>
      <MyCreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      {isLoading ? (<p>Loading data...</p>) : (
        <table className='mt-2'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel() && table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
