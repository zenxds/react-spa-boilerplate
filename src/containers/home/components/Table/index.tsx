import React, { Fragment, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import { Table, Tooltip, Popconfirm, Button, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'

import type { TableProps } from 'antd'
interface RecordType {
  key: string
  id: string
  name: string
  description?: string
}

import { useDataSourceStore } from '@/stores'
import * as services from '@/services'
import { useModal } from '@/hooks'
import FormModal from '@/components/FormModal'
// import Base from '@components/BasePage/SearchTable/Table'

import ItemForm from '../ItemForm'
import './styles.less'

interface FetchDataParamsType {
  pageNo?: number
  pageSize?: number
}

export default observer(() => {
  const { store, handleReset } = useDataSourceStore()
  const editModal = useModal(false)
  const copyModal = useModal(false)

  const fetchData = React.useCallback(
    async (params: FetchDataParamsType = {}) => {
      params = {
        pageNo: store.pageNo,
        pageSize: store.pageSize,
        ...store.conditionsObject,
        ...params,
      }

      store.merge({
        loading: true,
      })

      const result = await services.getHomeList(params)
      if (result) {
        store.merge({
          loading: false,
          pageNo: params.pageNo,
          pageSize: params.pageSize,
          dataSource: result.items,
          total: result.total,
        })
      } else {
        store.merge({
          loading: false,
        })
      }
    },
    [store],
  )

  const handleEdit = React.useCallback(
    (record: any) => {
      editModal.handleOpen(record)
    },
    [editModal],
  )

  const handleEditSuccess = React.useCallback(() => {
    message.success('编辑成功')
    editModal.handleClose()
    fetchData()
  }, [editModal, fetchData])

  const handleCopy = React.useCallback(
    (record: any) => {
      const copyItem = Object.assign({}, record)
      delete copyItem.id
      copyModal.handleOpen(copyItem)
    },
    [copyModal],
  )

  const handleCopySuccess = React.useCallback(() => {
    message.success('新建成功')
    copyModal.handleClose()
    fetchData()
  }, [copyModal, fetchData])

  const handleTableChange = React.useCallback<
    Required<TableProps<RecordType>>['onChange']
  >((pagination, filters, sorter) => {
    store.merge({
      fetchId: Date.now(),
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    })
  }, [])

  const submitDelete = React.useCallback(
    async (record: any) => {
      const result = await services.deleteHomeItem({
        id: record.id,
      })
      if (result) {
        message.success(`删除${record.name}成功`)

        handleReset()
      }
    },
    [handleReset],
  )

  const pagination = React.useMemo(() => {
    return {
      current: store.pageNo,
      pageSize: store.pageSize,
      total: store.total,
    }
  }, [store.pageNo, store.pageSize, store.total])

  useEffect(() => {
    const disposer = reaction(
      () => {
        return store.fetchId
      },
      () => {
        fetchData()
      },
      {
        fireImmediately: true,
      },
    )

    return () => {
      disposer()
    }
  }, [store, fetchData])

  const columns: TableProps<RecordType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'userId',
      render: (text, record, index: number) => {
        return (store.pageNo - 1) * store.pageSize + index + 1
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
      render: (val) => {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle" className="table-actions">
            <EditOutlined onClick={handleEdit.bind(this, record)} />
            <CopyOutlined onClick={handleCopy.bind(this, record)} />
            <Popconfirm
              title={`您确定要删除“${record.name}”吗`}
              onConfirm={submitDelete.bind(this, record)}
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
      <Table
        loading={store.loading}
        columns={columns}
        size="small"
        rowKey={(record) => record.id}
        dataSource={toJS(store.dataSource)}
        pagination={pagination}
        onChange={handleTableChange}
      />

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
})