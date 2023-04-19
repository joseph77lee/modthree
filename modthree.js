const Fsm = require("./FSM");

function modthree() {
  const states = new Set(["S0", "S1", "S2"]);
  const alphabet = new Set(["0", "1"]);
  const transitionFunction = {
    S0: { 0: "S0", 1: "S1" },
    S1: { 0: "S2", 1: "S0" },
    S2: { 0: "S1", 1: "S2" },
  };
  const startState = "S0";
  const acceptStates = new Set(["S0", "S1", "S2"]);

  return new Fsm(
    states,
    alphabet,
    transitionFunction,
    startState,
    acceptStates
  );
}

const d = modthree();

console.log(d.run("1101"));
console.log(d.run("1110"));
console.log(d.run("1111"));
