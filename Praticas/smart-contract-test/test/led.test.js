const assert = require("assert");

class Led {
  color() {
    return "blue";
  }
  status() {
    return "on";
  }
}

let led;

beforeEach(() => {
  led = new Led();
});
describe("Teste do Led", () => {
  it("What is color", () => {
    assert.strictEqual(led.color(), "blue");
  });
  it("The led is on", () => {
    assert.strictEqual(led.status(), "on");
  });
});
