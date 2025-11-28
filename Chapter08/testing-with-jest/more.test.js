describe("uppercase", () => {
  test("uppercase hello returns HELLO", () => {
    uppercase = jest.fn(() => "HELLO");
    const result = uppercase("hello");
    expect(uppercase).toHaveBeenCalledWith("hello");
    expect(result).toBe("HELLO");
  });
});

describe("fetchData", () => {
  const { fetchData, fetchDataCallback } = require("./more");
  test("data is hello", async () => {
    await expect(fetchData()).resolves.toBe("hello");
  });

  test("the data is hello", (done) => {
    function callback(data) {
      try {
        expect(data).toBe("hello");
        done();
      } catch (error) {
        done(error);
      }
    }
    fetchDataCallback(callback);
  });
});
