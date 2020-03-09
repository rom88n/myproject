import {
  SET_CATEGORIES
} from '../types'

export const setCategories = (arr) => ({
  type: SET_CATEGORIES,
  payload: arr
})
