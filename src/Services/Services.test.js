import React from 'react'
import ReactDOM from 'react-dom'
import FridgeContents from './fridgeContent'

it('renders FridgeContents without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <FridgeContents />, div
  )
  ReactDOM.unmountComponentAtNode(div)
})
