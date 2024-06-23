import React from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const useToast = ( time = 2000) => {
  const navigate = useNavigate();

  const toastSucess = (message, to = null) => {
    toast.success(message)
    to && setTimeout( () => { navigate(to, { replace: true }) }, time )
  }

  const toastError = (message, to = null) => {
    toast.error(message)
    to && setTimeout( () => { navigate(to, { replace: true }) }, time )
  }

  return { toastSucess, toastError }
}

export default useToast