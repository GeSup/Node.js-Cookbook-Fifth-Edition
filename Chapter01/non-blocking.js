console.log('Before non-blocking operation', new Date());

// Non-blocking operation (setTimeout)
setTimeout(() => {
  console.log('Non-blocking operation completed', new Date());
}, 3000); // Simulate a non-blocking operation that takes 3 seconds

console.log('After non-blocking operation', new Date());
