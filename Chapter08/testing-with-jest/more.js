function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("hello"), 1000);
  });
}

function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("hello");
  }, 1000);
}

module.exports = { fetchData, fetchDataCallback };