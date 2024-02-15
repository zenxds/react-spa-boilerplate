import { useCallback, useState } from 'react'

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const [data, setData] = useState(null)

  const handleOpen = useCallback((data: any) => {
    setOpen(true)
    setData(data)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setData(null)
  }, [])

  return {
    open,
    data,
    handleOpen,
    handleClose,
  }
}
