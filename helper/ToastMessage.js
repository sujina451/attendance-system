import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

export function toastMessage() {
    toast("success custom toast",{
        position:toast.POSITION.BOTTOM_CENTER
    })
    
        toast.success("successful")
   
        toast.error("error")
  
        toast.info("info")
  
        toast.warn("warned")
  
}
