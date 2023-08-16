import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table'
import axios from 'axios'

export default function Database() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://infoag-backend.onrender.com/")
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
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> 
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
      </main>
    </div>
  )
}
