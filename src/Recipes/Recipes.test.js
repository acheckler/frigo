import React from 'react'
import ReactDOM from 'react-dom'
import FoodList from './FoodList';
import RecipeSearch from './RecipeSearch'



it('renders RecipeSearch without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <RecipeSearch />, div
  )
  ReactDOM.unmountComponentAtNode(div)
})

it('renders FoodList without crashing', () => {
    const fakeFood = {
        name: "Apple",
        id: 101,
        category: "Fruits"
    }
    const div = document.createElement('div')
    ReactDOM.render(
      <FoodList food={fakeFood}/>, div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
