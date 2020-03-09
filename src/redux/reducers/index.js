import { combineReducers } from 'redux'
import state from './state'
import { reducer as forms } from 'redux-form'

export default combineReducers({ state, form: forms })
