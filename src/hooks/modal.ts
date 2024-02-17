import { useCallback, useState, useMemo } from 'react'

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  const [data, setData] = useState(null)

  const handleOpen = useCallback((openData: any) => {
    setOpen(true)
    setData(openData)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setData(null)
  }, [])

  return useMemo(() => {
    return {
      open,
      data,
      handleOpen,
      handleClose,
    }
  }, [open, data, handleOpen, handleClose])
}
