import React from 'react';
import Sidebar from './Sidebar'; // Adjust the path accordingly

export default function Dashboard() {

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ padding: 10 }}> Main content</main>
    </div>
  );
}