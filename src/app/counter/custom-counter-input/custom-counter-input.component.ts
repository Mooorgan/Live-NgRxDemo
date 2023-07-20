import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { Observable } from 'rxjs';
import { getChannelName } from '../state/counters.selectors';
import { CounterState } from 'src/app/model/counter.model';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value!: number;
  channelName$!: Observable<string>;

  constructor(private store: Store<{ counter: CounterState }>) {}

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    // console.log(this.value);
    this.store.dispatch(customIncrement({ count: this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
