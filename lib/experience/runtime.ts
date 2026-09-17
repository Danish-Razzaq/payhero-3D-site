type Listener = (progress: number) => void;

let progress = 0;
const listeners = new Set<Listener>();

export const pointer = { x: 0, y: 0 };

export function getExperienceProgress() {
  return progress;
}

export function setExperienceProgress(next: number) {
  progress = next;
  listeners.forEach((fn) => fn(progress));
}

export function subscribeExperience(fn: Listener) {
  listeners.add(fn);
  fn(progress);
  return () => {
    listeners.delete(fn);
  };
}

export function setPointer(nx: number, ny: number) {
  pointer.x = nx;
  pointer.y = ny;
}

export function getPointer() {
  return pointer;
}
