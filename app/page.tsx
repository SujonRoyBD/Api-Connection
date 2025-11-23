import React from 'react'
import Home from './datafetch/page'
import DataTable from './table/page'
import NewTable from './newTableCreate/page'
import TanstackApi from './tanstackApi/page'

export default function Main() {
  return (
    <div>
      <Home/>
      <DataTable/>
      <NewTable/>
      <TanstackApi/>
    </div>
  )
}
