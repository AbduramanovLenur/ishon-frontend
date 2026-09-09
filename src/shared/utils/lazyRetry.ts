import { lazy, type ComponentType } from 'react';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export function lazyRetry(
  factory: () => Promise<{ default: ComponentType<Record<string, unknown>> }>
) {
  return lazy(() => retryImport(factory, MAX_RETRIES));
}

function retryImport(
  factory: () => Promise<{ default: ComponentType<Record<string, unknown>> }>,
  retriesLeft: number
): Promise<{ default: ComponentType<Record<string, unknown>> }> {
  return factory().catch((error) => {
    if (retriesLeft <= 0) {
      window.location.reload();
      throw error;
    }
    return new Promise<{ default: ComponentType<Record<string, unknown>> }>((resolve) => {
      setTimeout(() => {
        resolve(retryImport(factory, retriesLeft - 1));
      }, RETRY_DELAY);
    });
  });
}
