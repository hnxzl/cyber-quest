// FSM engine for CyberQuest
export type FSMState = {
  on?: Record<string, string>;
  entry?: string[];
  type?: "final";
};

export type FSMDefinition = {
  id: string;
  initial: string;
  states: Record<string, FSMState>;
};

export type FSMContext = {
  currentState: string;
  score: number;
  log: string[];
};

export function runFSM(
  fsm: FSMDefinition,
  context: FSMContext,
  action: string
): FSMContext {
  const state = fsm.states[context.currentState];
  if (!state || !state.on) return context;
  const nextState = state.on[action];
  if (!nextState) return context;
  let score = context.score;
  let log = [
    ...context.log,
    `${context.currentState} -> ${action} -> ${nextState}`,
  ];
  const entry = fsm.states[nextState]?.entry || [];
  entry.forEach((e) => {
    if (e === "award_points") score += 10;
    if (e === "deduct_points") score -= 5;
  });
  return {
    currentState: nextState,
    score,
    log,
  };
}
