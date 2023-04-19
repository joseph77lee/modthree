const FSM = require("./FSM");

describe("FSM", () => {
  test("should accept modthree's valid output", () => {
    const fsm = new FSM(
      new Set(["S0", "S1"]),
      new Set(["0", "1"]),
      {
        S0: { 0: "S0", 1: "S1" },
        S1: { 0: "S2", 1: "S0" },
        S2: { 0: "S1", 1: "S2" },
      },
      "S0",
      new Set(["S0", "S1", "S2"])
    );

    const result1 = fsm.run("1101").currentState.substring(1);
    const result2 = fsm.run("1110").currentState.substring(1);
    const result3 = fsm.run("1111").currentState.substring(1);

    expect(result1).toBe("1");
    expect(result2).toBe("2");
    expect(result3).toBe("0");
  });

  test("should reject modthree's invalid output", () => {
    const fsm = new FSM(
      new Set(["S0", "S1"]),
      new Set(["0", "1"]),
      {
        S0: { 0: "S0", 1: "S1" },
        S1: { 0: "S2", 1: "S0" },
        S2: { 0: "S1", 1: "S2" },
      },
      "S0",
      new Set(["S2"])
    );

    const result1 = fsm.run("110").isAcceptState;
    const result2 = fsm.run("1010").isAcceptState;

    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  test("should accept input strings that end in 1", () => {
    const fsm = new FSM(
      new Set(["S0", "S1"]),
      new Set(["0", "1"]),
      {
        S0: { 0: "S0", 1: "S1" },
        S1: { 0: "S1", 1: "S1" },
      },
      "S0",
      new Set(["S1"])
    );

    expect(fsm.run("10001").isAcceptState).toBe(true);
    expect(fsm.run("011101").isAcceptState).toBe(true);
    expect(fsm.run("1").isAcceptState).toBe(true);
  });

  test("should accept input strings that contain three consecutive 1s", () => {
    const fsm = new FSM(
      new Set(["S0", "S1", "S2", "S3"]),
      new Set(["0", "1"]),
      {
        S0: { 0: "S0", 1: "S1" },
        S1: { 0: "S0", 1: "S2" },
        S2: { 0: "S0", 1: "S3" },
        S3: { 0: "S3", 1: "S3" },
      },
      "S0",
      new Set(["S3"])
    );
    expect(fsm.run("0101011").isAcceptState).toBe(false);
    expect(fsm.run("01111110").isAcceptState).toBe(true);
    expect(fsm.run("111").isAcceptState).toBe(true);
  });
});
