import React from 'react'
import { Route } from 'react-router-dom'
import AddBook from './AddBook'
import './App.css'
import { BooksHome } from './BooksHome'

const BooksApp = React.memo(props => {

  return (
    <div className="app">
      <Route path='/addBook' render={() => (
        <AddBook />
      )} />

      <Route exact path='/' render={() => (
        <BooksHome />
      )} />
    </div>
  )

});

export default BooksApp
