const withTimeout = (promise, ms = 15000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI_TIMEOUT")), ms)
    ),
  ]);
};
export default withTimeout;