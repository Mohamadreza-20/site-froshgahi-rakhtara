export function createMutationQueue() {
  let queue = Promise.resolve();

  return (mutation) => {
    const next = queue.then(mutation, mutation);
    queue = next.catch(() => undefined);
    return next;
  };
}
