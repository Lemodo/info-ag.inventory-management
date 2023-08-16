import React from 'react'
import Sidebar from './Sidebar'
import Database from './Database'

export default function Inventory() {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> 
      <Database />
      </main>
    </div>
  )
}
