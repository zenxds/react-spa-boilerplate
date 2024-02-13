import { cloneElement, useState, useCallback } from 'react'
import { Modal, Form } from 'antd'
import { observer } from 'mobx-react'

export default observer(
  ({ children, processor, validator, service, onSuccess, ...props }) => {
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
        {...props}
      >
        {cloneElement(children, {
          form,
        })}
      </Modal>
    )
  },
)
