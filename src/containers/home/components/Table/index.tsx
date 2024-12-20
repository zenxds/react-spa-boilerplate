import React from 'react'
import dayjs from 'dayjs'
import { Table, Tooltip, Popconfirm, Button, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { useAntdTableContext, useModal } from '@zenxds/utils'

import type { TableProps } from 'antd'

import * as services from '@/services'
import FormModal from '@/components/FormModal'

import ItemForm from '../ItemForm'

interface RecordType {
  key: string
  id: string
  name: string
  description?: string
}

export default () => {
  const { tableProps, search } = useAntdTableContext()
  const editModal = useModal(false)
  const copyModal = useModal(false)

  const handleEdit = (record: any) => {
    editModal.handleOpen(record)
  }

  const handleEditSuccess = () => {
    message.success('编辑成功')
    editModal.handleClose()
    search?.submit()
  }

  const handleCopy = (record: any) => {
    const copyItem = Object.assign({}, record)
    delete copyItem.id
    copyModal.handleOpen(copyItem)
  }

  const handleCopySuccess = () => {
    message.success('新建成功')
    copyModal.handleClose()
    search?.reset()
  }

  const submitDelete = async (record: any) => {
    const result = await services.deleteHomeItem({
      id: record.id,
    })
    if (result) {
      message.success(`删除${record.name}成功`)

      // 当前页全部删除了，切到第一页
      if (tableProps?.dataSource.length === 1) {
        search?.reset()
      } else {
        search?.submit()
      }
    }
  }

  const columns: TableProps<RecordType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'userId',
      render: (text, record, index: number) => {
        return (
          (tableProps?.pagination.current - 1) *
            tableProps?.pagination.pageSize +
          index +
          1
        )
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (name, record) => {
        if (record.description) {
          return <Tooltip title={record.description}>{name}</Tooltip>
        }

        return name
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: val => {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle" className="table-actions">
            <EditOutlined onClick={() => handleEdit(record)} />
            <CopyOutlined onClick={() => handleCopy(record)} />
            <Popconfirm
              title={`您确定要删除“${record.name}”吗`}
              onConfirm={() => submitDelete(record)}
            >
              <Button icon={<DeleteOutlined />} type="link" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Table {...tableProps} columns={columns} />

      {editModal.open ? (
        <FormModal
          title="编辑"
          width={600}
          service={services.editHomeItem}
          onSuccess={handleEditSuccess}
          onCancel={editModal.handleClose}
        >
          <ItemForm data={editModal.data} />
        </FormModal>
      ) : null}

      {copyModal.open ? (
        <FormModal
          title="新建"
          width={600}
          service={services.createHomeItem}
          // processor={this.handleValues}
          onSuccess={handleCopySuccess}
          onCancel={copyModal.handleClose}
        >
          <ItemForm data={copyModal.data} />
        </FormModal>
      ) : null}
    </>
  )
}
