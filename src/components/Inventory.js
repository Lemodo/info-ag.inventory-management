import React from 'react'
import Sidebar from './Sidebar'
import Database from './Database'

export default function Inventory() {

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
      header: 'Last Updated By',
      accessorKey: 'last_updated_user',
      footer: 'Last Updated'
    }
  ]

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> 
      <Database columns={columns}/>
      </main>
    </div>
  )
}
