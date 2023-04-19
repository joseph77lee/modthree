class Fsm {
  constructor(states, alphabet, transitionFunction, startState, acceptStates) {
    this.states = states;
    this.alphabet = alphabet;
    this.transitionFunction = transitionFunction;
    this.startState = startState;
    this.acceptStates = acceptStates;
  }

  run(inputString) {
    let currentState = this.startState;

    for (let symbol of inputString) {
      currentState = this.transitionFunction[currentState][symbol];
    }

    const isAcceptState = this.acceptStates.has(currentState);

    return { currentState, isAcceptState };
  }
}

module.exports = Fsm;
