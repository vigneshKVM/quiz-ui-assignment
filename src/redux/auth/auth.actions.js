import { AuthTypes } from "./auth.types";

// Question
export const addQuestion = (payload) => ({
  type: AuthTypes.ADD_QUESTION,
  payload,
});

export const updateQuestion = (payload) => ({
  type: AuthTypes.UPDATE_QUESTION,
  payload,
});

export const deleteQuestion = (payload) => ({
  type: AuthTypes.DELETE_QUESTION,
  payload,
});


export const addImageToQuestion = (payload) => ({
  type: AuthTypes.ADD_IMAGE_TO_QUESTION,
  payload,
});


//
export const addOption = (payload) => ({
  type: AuthTypes.ADD_OPTION,
  payload,
});

export const updateOption = (payload) => ({
  type: AuthTypes.UPDATE_OPTION,
  payload,
});

export const deleteOption = (payload) => ({
  type: AuthTypes.DELETE_OPTION,
  payload,
});
