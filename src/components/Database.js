import React, { useEffect, useState } from 'react'
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import MyCreateModal from './MyCreateModal';




export default function Database() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [createModalShow, setCreateModalShow] = React.useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API)
      .then(res => {
        setData(res.data);
        console.log("loaded" + res.data)
        setIsLoading(false); // Data is now loaded
      })
      .catch(err => console.log(err));
  }, []);


  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'id'
    },
    {
      header: 'Name',
      accessorKey: 'product_name',
      footer: 'Name'
    },
    {
      header: 'Description',
      accessorKey: 'description',
      footer: 'Description'
    },
    {
      header: 'Location',
      accessorKey: 'location',
      footer: 'Location'
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      footer: 'Quantity'
    },
    {
      header: 'Last Updated',
      accessorKey: 'last_updated_user',
      footer: 'Last Updated'
    },
    {
      header: 'Created By',
      accessorKey: 'created_by',
      footer: 'Created By'
    }
  ]

  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div>
        <Button variant="secondary" onClick={() => setCreateModalShow(true)}>
          Create
        </Button>
        <MyCreateModal 
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
        />
        {isLoading ? (<p>Loading data...</p>) : (
          <table>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>)}
              </tr>
            ))}
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
            <tfoot>
              <tr>
                <td>ID</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </>
  )
}
