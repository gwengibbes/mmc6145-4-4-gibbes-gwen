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
export default function reducer(prevState,{action, payload}) {
  switch (action) {
    case ADD_BOOK :
//Check to see if a book is alread a favorite and if it is just do nothing. 
      const added = prevState.favoriteBooks.find(favoriteBook => {
        return favoriteBook.id === payload.id;
      });
      if(added){
        return {...prevState};
      }
      prevState.favoriteBooks.push(payload);
      saveToLocalStorage(prevState.favoriteBooks);
      return {...prevState};
    case  REMOVE_BOOK :
      prevState.favoriteBooks = prevState.favoriteBooks.filter(favoriteBook => {
        return favoriteBook.id !== payload;
      });
      saveToLocalStorage(prevState.favoriteBooks);
      return {... prevState};
    case SEARCH_BOOKS :
      prevState.bookSearchResults = payload;
      return {... prevState};
      default:
        return prevState;
  }
}

// This helper function stores the favoriteBook state in localStorage as a string
function saveToLocalStorage(favBooks) {
  localStorage.setItem('favoriteBooks', JSON.stringify(favBooks))
}
