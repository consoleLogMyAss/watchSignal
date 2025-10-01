import { Component, OnInit, signal, untracked, WritableSignal } from '@angular/core';
import { watchSignal } from './handlers';


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  public name: WritableSignal<string> = signal('Max')

  protected count: WritableSignal<number> = watchSignal(1, (val, prevVal) => {
    console.log({ val, prevVal });
  });

  ngOnInit(): void {
    console.log(untracked(this.name));
  }

  protected onClick(): void {
    this.count.update(v => v + 1);
  }
}
