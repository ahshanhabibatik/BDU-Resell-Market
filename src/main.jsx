import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/router';
import AuthProvider from './Provider/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <div className='mx-2'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  </StrictMode>,
)
