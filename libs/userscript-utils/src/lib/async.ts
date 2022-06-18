// eslint-disable-next-line no-promise-executor-return
export const sleepMs = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export const sleep = (seconds: number) => sleepMs(seconds * 1000);
