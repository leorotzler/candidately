/* eslint-disable react/jsx-key */
import React from 'react'
import {
  useTable,
  useBlockLayout,
  useResizeColumns,
  useFlexLayout,
} from 'react-table'
import { createUseStyles } from 'react-jss'
import { theming } from '@mantine/core'
import { getStatusBadgeFromStatus } from '../../utils/statusHelper'

const useStyles = createUseStyles(
  (theme) => ({
    table: {
      width: '100%',
      display: 'inline-block',
      borderSpacing: '0',
      backgroundColor: theme.colors.dark[5],
      border: `1px solid ${theme.colors.dark[3]}`,
      borderBottomLeftRadius: '8px',
      borderTopRightRadius: '8px',
      overflow: 'auto',
    },
    headRow: {
      textTransform: 'uppercase',
      fontSize: theme.fontSizes.xs,
      fontWeight: 700,
      color: theme.colors.gray[3],
    },
    tr: {
      '&:last-child': {
        '& > div': {
          borderBottom: 0,
        },
      },
    },
    th: {
      margin: '0',
      padding: '.5rem .5rem .5rem 1rem',
      borderBottom: `1px solid ${theme.colors.dark[3]}`,
      borderRight: `1px solid ${theme.colors.dark[3]}`,
      position: 'relative',
      '&:last-child': {
        borderRight: 0,
      },
    },
    td: {
      margin: '0',
      padding: '.5rem .5rem .5rem 1rem',
      borderBottom: `1px solid ${theme.colors.dark[3]}`,
      borderRight: `1px solid ${theme.colors.dark[3]}`,
      position: 'relative',
      '&:last-child': {
        borderRight: 0,
      },
    },
    resizer: {
      display: 'inline-block',
      background: 'transparent',
      width: '5px',
      height: '100%',
      position: 'absolute',
      right: '2px',
      top: '0',
      transform: 'translateX(50%)',
      zIndex: '1',
      touchAction: 'none',
    },
  }),
  { theming }
)

export default function Table({ columns, data }) {
  const classes = useStyles()

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      maxWidth: 400,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useResizeColumns
  )

  console.log(getStatusBadgeFromStatus('todo'));

  return (
    <div>

      <div {...getTableProps()} className={classes.table}>
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className={classes.headRow}>
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className={classes.th}>
                  {column.render('Header')}
                  <div
                    {...column.getResizerProps()}
                    className={`${classes.resizer} ${
                      column.isResizing ? 'isResizing' : ''
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <div {...row.getRowProps()} className={classes.tr}>
                {row.cells.map((cell) => {
                  console.log(cell)
                  if (cell.column.id === 'status') {
                    return (
                      <div {...cell.getCellProps()} className={classes.td}>
                        {getStatusBadgeFromStatus(cell.value)}
                      </div>
                    )
                  }
                  return (
                    <div {...cell.getCellProps()} className={classes.td}>
                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
