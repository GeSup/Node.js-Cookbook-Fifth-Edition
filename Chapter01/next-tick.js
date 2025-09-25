console.log('Start', new Date());

process.nextTick(() => {
  console.log('Callback scheduled with process.nextTick #1', new Date());
});

setTimeout(() => {
  console.log('setTimeout #1 callback', new Date());
}, 0);

process.nextTick(() => {
  console.log('Callback scheduled with process.nextTick #2', new Date());
});

console.log('End', new Date());
