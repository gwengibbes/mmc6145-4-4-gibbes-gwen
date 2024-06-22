// Import actions 
import { useReducer } from 'react'
import {
  ADD_BOOK,
  REMOVE_BOOK,
  SEARCH_BOOKS
} from './actions'
import initialState from './state'

function App() {
  const[{ADD_BOOK, REMOVE_BOOK, SEARCH_BOOKS}, dispatch] = useReducer(reducer, initialState)
}

// Implement reducer for each action
export default function reducer(prevState,{action, book, payload}) {
  switch (action) {
    case ADD_BOOK :
      initialState.favoriteBooks.push(book);
      saveToLocalStorage(initialState.favoriteBooks);
      return {initialState};
    case  REMOVE_BOOK :
      initialState.favoriteBooks = initialState.favoriteBooks.filter(favoriteBook => {
        return favoriteBook.id !== book.id;
      });
      saveToLocalStorage(initialState.favoriteBooks);
      return {... prevState};
    case SEARCH_BOOKS :
      initialState.bookSearchResults = payload;
      return {... prevState};
      default:
        return prevState;
  }
}

// This helper function stores the favoriteBook state in localStorage as a string
function saveToLocalStorage(favBooks) {
  localStorage.setItem('favoriteBooks', JSON.stringify(favBooks))
}
