import {signal, untracked, WritableSignal} from '@angular/core';

export function watchSignal<T>(
  initial: T,
  cb: (next: T, prev: T) => void
): WritableSignal<T> {
  const s: WritableSignal<T> = signal<T>(initial);

  const refOnSignalSet: (value: T) => void = s.set;

  s.set = (val: T) => {
    const prev: T = untracked(s);

    refOnSignalSet(val);

    if (!Object.is(prev, val)) {
      untracked(() => cb(val, prev));
    }
  };

  s.update = (updateFn: (value: T) => T) => {
    const prev: T = untracked(s);
    const next: T = updateFn(prev);

    refOnSignalSet(next);

    if (!Object.is(prev, next)) {
      untracked(() => cb(next, prev));
    }
  };

  return s;
}
