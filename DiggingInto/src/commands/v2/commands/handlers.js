const handlers = [];

export function register(newHandlers) {
  handlers.push(...newHandlers);
}

export function getHandlersFor(command) {
  return handlers.filter((h) =>
    h.canHandle(command)
  );
}
