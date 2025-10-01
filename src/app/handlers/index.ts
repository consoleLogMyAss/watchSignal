import {signal, untracked, WritableSignal} from '@angular/core';

export function watchSignal<T>(
  initial: T,
  cb: (next: T, prev: T) => void
): WritableSignal<T> {
  const s: WritableSignal<T> = signal<T>(initial);

  const signalSet: (value: T) => void = s.set;

  (s as WritableSignal<T>).set = (val: T) => {
    const prev: T = untracked(s);

    signalSet(val);

    if (!Object.is(prev, val)) {
      untracked(() => cb(val, prev));
    }
  };

  (s as WritableSignal<T>).update = (fn: (v: T) => T) => {
    const prev: T = untracked(s);
    const next: T = fn(prev);

    signalSet(next);

    if (!Object.is(prev, next)) {
      untracked(() => cb(next, prev));
    }
  };

  return s;
}
