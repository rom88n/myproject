import {
  SET_CATEGORIES
} from '../types'

const initialState = {}

export default function reducerState(state = { ...initialState }, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    default:
      return state
  }
}
