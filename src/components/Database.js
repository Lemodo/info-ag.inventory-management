import React from 'react'
import Sidebar from './Sidebar'

export default function Database() {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> Database view</main>
    </div>
  )
}
