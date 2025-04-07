import React from 'react'

export default function loading() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1B1B21' }}>
      <h2 className='font' style={{ color: '#fff' }}>Loading...</h2>
    </div>
  )
}
