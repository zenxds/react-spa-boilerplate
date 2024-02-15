import { useMemo } from 'react'
import { Row, Col, Button } from 'antd'

import './styles.less'

interface PropsType {
  column?: number
  handleSearch: () => void
  handleReset: () => void
  children: React.ReactNode
}

export default ({
  column = 3,
  handleSearch,
  handleReset,
  children,
}: PropsType) => {
  const childrenNodes = useMemo(() => {
    if (Array.isArray(children)) {
      return [...children].filter((child) => !!child)
    }

    return [children]
  }, [children])

  // 按钮需要占一格，如果正好是3的倍数，额外增加一行
  const row = useMemo(() => {
    let result = Math.ceil(childrenNodes.length / column)

    if (childrenNodes.length % column === 0) {
      result++
    }

    return result
  }, [column, childrenNodes])

  const rows = new Array(row).fill(undefined).map((_, rowIndex) => {
    const isLastRow = rowIndex === row - 1
    return (
      <Row
        className={isLastRow ? 'search-form-row-last' : ''}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        key={rowIndex}
      >
        {new Array(column).fill(undefined).map((_, columnIndex) => {
          const index = rowIndex * column + columnIndex
          const item = childrenNodes[index]

          if (!item) {
            const isLast = index === row * column - 1

            if (isLast) {
              return (
                <Col
                  key="search-form-actions"
                  className="search-form-actions"
                  xs={24}
                  md={8}
                >
                  <Button type="primary" onClick={handleSearch}>
                    查询
                  </Button>
                  <Button onClick={handleReset}>重置</Button>
                </Col>
              )
            }

            return <Col key={columnIndex} xs={24} md={8} />
          }

          return (
            <Col key={item.props.name || columnIndex} xs={24} md={8}>
              {item}
            </Col>
          )
        })}
      </Row>
    )
  })

  return rows
}
