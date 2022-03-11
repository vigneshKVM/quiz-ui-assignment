import { mapKeys, omit } from "lodash";

import { AuthTypes } from "./auth.types";

const INITIAL_STATE = {
  questions: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.ADD_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: action.payload,
        },
      };

    case AuthTypes.DELETE_QUESTION:
      return {
        ...state,
        questions: omit(state.questions, action.payload),
      };

    case AuthTypes.ADD_OPTION:
      const qnId = action.payload.questionId;
      const opId = action.payload.option.optionId;

      return {
        ...state,
        questions: {
          ...state.questions,
          [qnId]: {
            ...state.questions[qnId],
            options: {
              ...state.questions[qnId].options,
              [opId]: action.payload.option,
            },
          },
        },
      };

    case AuthTypes.DELETE_OPTION:
      const questionId = action.payload.questionId;
      const optionId = action.payload.optionId;

      return {
        ...state,
        questions: {
          ...state.questions,
          [questionId]: {
            ...state.questions[questionId],
            options: omit(state.questions[questionId].options, optionId),
          },
        },
      };

    default:
      return state;
  }
};

export default authReducer;
