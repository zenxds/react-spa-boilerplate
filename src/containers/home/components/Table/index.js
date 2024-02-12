import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import dayjs from 'dayjs'
import { Table, Tooltip, Popconfirm, Button, Space } from 'antd'
import { EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'

import FormModal from '@components/FormModal'
import Base from '@components/BasePage/SearchTable/Table'
import { useLocalContext } from '../../context'

import ItemForm from '../ItemForm'
import './styles.less'

export default observer(() => {
  const { store } = useLocalContext()

  return (
    <>
      <Table
        loading={store.loading}
        columns={[]}
        size="small"
        rowKey={record => record.id}
        dataSource={[]}
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
