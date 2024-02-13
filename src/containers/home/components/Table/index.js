import React, { Fragment, useEffect } from 'react'
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import { Table, Tooltip, Popconfirm, Button, Space, message } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'

import { useDataSourceStore } from '@stores'
import * as services from '@services'
// import FormModal from '@components/FormModal'
// import Base from '@components/BasePage/SearchTable/Table'

// import ItemForm from '../ItemForm'
import './styles.less'

export default observer(() => {
  const store = useDataSourceStore()

  const handleEdit = React.useCallback(record => {}, [])

  const handleCopy = React.useCallback(record => {}, [])

  const submitDelete = React.useCallback(record => {}, [])

  const fetchData = React.useCallback(
    (params = {}) => {
      store.loading = true

      services
        .getHomeList({
          pageNo: store.pageNo,
          pageSize: store.pageSize,
          ...store.conditionsObject,
          ...params,
        })
        .then(result => {
          store.merge({
            loading: false,
            dataSource: result.items,
            total: result.total,
          })
        })
        .catch(err => {
          store.merge({
            loading: false,
          })

          message.error(err.message)
        })
    },
    [store],
  )

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

  const columns = [
    {
      title: '序号',
      dataIndex: 'userId',
      render: (text, record, index) => {
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
      render: val => {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle" styleName="actions">
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
        rowKey={record => record.id}
        dataSource={toJS(store.dataSource)}
        pagination={false}
      />
    </>
  )
})

// @observer
// export default class PageTable extends Base {
//   getColumns() {
//     const { page, pageSize } = this.state

//     return [
//       {
//         title: '序号',
//         dataIndex: 'userId',
//         render: (text, record, index) => {
//           return (page - 1) * pageSize + index + 1
//         },
//       },
//       {
//         title: '名称',
//         dataIndex: 'name',
//         render: (name, record) => {
//           if (record.description) {
//             return <Tooltip title={record.description}>{name}</Tooltip>
//           }

//           return name
//         },
//       },
//       {
//         title: '更新时间',
//         dataIndex: 'updatedAt',
//         render: val => {
//           return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
//         },
//       },
//       {
//         title: '操作',
//         key: 'action',
//         render: (_, record) => {
//           return (
//             <Space size="middle" styleName="actions">
//               <EditOutlined onClick={this.handleEdit.bind(this, record)} />
//               <CopyOutlined onClick={this.handleCopy.bind(this, record)} />
//               <Popconfirm
//                 title={`您确定要删除“${record.name}”吗`}
//                 onConfirm={this.submitDelete.bind(this, record)}
//               >
//                 <Button icon={<DeleteOutlined />} type="link" />
//               </Popconfirm>
//             </Space>
//           )
//         },
//       },
//     ]
//   }

//   render() {
//     const { store } = this.props

//     return (
//       <Fragment>
//         <Table
//           loading={store.loading}
//           columns={this.getColumns()}
//           size="small"
//           rowKey={record => record.id}
//           dataSource={this.getDataSource()}
//           pagination={this.getPagination()}
//         />
//         {this.state.editItem ? (
//           <FormModal
//             title="编辑"
//             width={600}
//             processor={this.handleValues}
//             action={actions.editItem}
//             onSuccess={this.handleEditSuccess}
//             onCancel={this.handleCancelEdit}
//           >
//             <ItemForm data={this.state.editItem} />
//           </FormModal>
//         ) : null}

//         {this.state.copyItem ? (
//           <FormModal
//             title="新建"
//             width={600}
//             action={actions.createItem}
//             processor={this.handleValues}
//             onSuccess={this.handleCopySuccess}
//             onCancel={this.handleCancelCopy}
//           >
//             <ItemForm data={this.state.copyItem} />
//           </FormModal>
//         ) : null}
//       </Fragment>
//     )
//   }
// }
