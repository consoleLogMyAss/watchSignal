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
    console.log('count1', { val, prevVal });
  });

  protected count2: WritableSignal<number> = watchSignal(1, this.watchHandlers);

  ngOnInit(): void {
    console.log(untracked(this.name));
  }

  protected onClick(): void {
    this.count.update(v => v + 1);
    this.count2.set(this.count2() + 1);
  }

  private watchHandlers(val: number, prevVal: number): void {
    console.log('count2', { val, prevVal });
  }
}
