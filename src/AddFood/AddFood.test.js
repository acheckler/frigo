import React from 'react'
import ReactDOM from 'react-dom'
import AddFood from './AddFood'


it('renders AddFood without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <AddFood />, div
  )
  ReactDOM.unmountComponentAtNode(div)
})