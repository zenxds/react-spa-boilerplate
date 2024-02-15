import React, { cloneElement, useState, useCallback } from 'react'
import { Modal, Form } from 'antd'
import { observer } from 'mobx-react'

import type { ReactElement } from 'react'
import type { ModalProps } from 'antd'

interface PropsType extends ModalProps {
  children: ReactElement
  validator?: (data: any) => boolean
  processor?: (data: any) => any
  service: (data: any) => Promise<any>
  onSuccess?: (res: any, data: any) => void
}

export default observer(
  ({
    children,
    processor,
    validator,
    service,
    onSuccess,
    ...modalProps
  }: PropsType) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const handleOk = useCallback(async () => {
      let values = {}

      try {
        values = await form.validateFields()
      } catch (err) {
        return
      }

      // 额外的校验
      if (validator) {
        const valid = validator(values)
        if (!valid) {
          return
        }
      }

      if (processor) {
        values = processor(values)
      }

      setLoading(true)

      const res = await service(values)
      setLoading(false)

      if (res && onSuccess) {
        onSuccess(res, values)
      }
    }, [form, processor, validator, service, onSuccess])

    return (
      <Modal
        open={true}
        confirmLoading={loading}
        destroyOnClose={true}
        onOk={handleOk}
        {...modalProps}
      >
        {cloneElement(children, {
          form,
        })}
      </Modal>
    )
  },
)
