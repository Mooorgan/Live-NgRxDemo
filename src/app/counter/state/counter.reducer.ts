import { createReducer, on } from '@ngrx/store';
import {
  changeChannelName,
  customIncrement,
  decrement,
  increment,
  reset,
} from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({
    ...state,
    counter: state.counter + 1,
  })),
  on(decrement, (state) => ({
    ...state,
    counter: state.counter - 1,
  })),
  on(reset, (state) => ({
    ...state,
    counter: 0,
  })),
  on(customIncrement, (state, action) => {
    // console.log(state);
    // console.log(action);
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannelName, (state) => ({
    ...state,
    channelName: 'Modified Leela Web Dev',
  }))
);
