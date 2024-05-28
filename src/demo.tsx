import React from 'react'
import { createRoot } from 'react-dom/client'

import { TimelineGrid } from '.'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <div>Hello</div>
    <div style={{ width: "100vw", height: "100vh", padding: 0, margin: 0 }}>
      <TimelineGrid />
    </div>
  </React.StrictMode>
);