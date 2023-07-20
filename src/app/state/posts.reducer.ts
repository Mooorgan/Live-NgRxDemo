import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPost, deletePost, updatePost } from './posts.actions';

export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    console.log('add post');
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    console.log('update post');

    const updatedPosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    console.log(updatedPosts);
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state, { id }) => {
    const updatedPosts = state.posts.filter((post) => {
      return post.id !== id;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  })
);
