import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { deletePost } from 'src/app/state/posts.actions';
import { getPosts } from 'src/app/state/posts.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent {
  posts$: Observable<Post[]> = this.store.select(getPosts);
  constructor(private store: Store<AppState>) {}

  onDeletePost(id: string | undefined) {
    if (confirm('Are you sure you want to delete')) {
      if (!id) {
        return;
      } else {
        this.store.dispatch(deletePost({ id }));
      }
    }
  }
}
