import React from 'react'
import Sidebar from './Sidebar'
import { useReactTable } from '@tanstack/react-table'

export default function Database() {

const table = useReactTable(data, columns)


  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> 
        
      </main>
    </div>
  )
}
