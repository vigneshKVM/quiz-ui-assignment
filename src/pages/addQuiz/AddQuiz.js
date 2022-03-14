import React, { useState, useLayoutEffect } from "react";
import {
  AddQuizContainer,
  AddQuizSidebar,
  AddQuizContent,
  AddQuizHeading,
  AddQuizOptionContainer,
  AddQuizDeleteButton,
} from "./addQuiz.styles";
import { useSelector, useDispatch } from "react-redux";
import { mapKeys, omit } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";

// Components
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import TextArea from "../../components/textArea/TextArea";

// Redux
import * as AuthActions from "../../redux/auth/auth.actions";

const AddQuiz = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.auth.questions);

  const [activeQuestion, setActiveQuestion] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    function updateSize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const createNewOption = () => {
    return {
      optionId: uuidv4(),
      value: "",
    };
  };
  const createNewQuestion = () => {
    const questionId = uuidv4();
    const question = {
      questionId: questionId,
      value: "",
      image: "",
      options: [
        createNewOption(),
        createNewOption(),
        createNewOption(),
        createNewOption(),
      ],
    };
    question.options = { ...mapKeys(question.options, "optionId") };
    setActiveQuestion(question);
    return question;
  };

  const handleUpdateQuestion = (type, value, optionId = null) => {
    const updatedQuestion = Object.assign({}, activeQuestion);
    if (activeQuestion) {
      if (type === "question") {
        updatedQuestion.value = value;
        dispatch(AuthActions.addQuestion(updatedQuestion));
      } else if (type === "option") {
        updatedQuestion.options[optionId].value = value;
        setActiveQuestion(Object.assign({}, updatedQuestion));
        dispatch(AuthActions.addQuestion(updatedQuestion));
      }
    }
  };

  const getQuestionHeading = (question, index) => {
    if (screenSize.width <= 800) {
      return "Q" + (index + 1);
    } else {
      return question.value.length > 20
        ? question.value.substring(0, 20) + "..."
        : question.value || "Question No " + (index + 1);
    }
  };

  const handleFileUpload = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <AddQuizContainer>
      <AddQuizSidebar
        style={{ padding: screenSize.width >= 800 ? "40px" : "10px" }}
      >
        {screenSize.width > 800 && (
          <AddQuizHeading active>Select Your Questions</AddQuizHeading>
        )}
        <br />
        <br />
        {Object.values(questions)?.map((question, index) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
              key={question.questionId}
            >
              <AddQuizHeading
                active={activeQuestion.questionId === question.questionId}
                onClick={() => setActiveQuestion(question)}
                style={{ cursor: "pointer" }}
              >
                {getQuestionHeading(question, index)}
              </AddQuizHeading>
              <AddQuizDeleteButton
                onClick={() => {
                  if (activeQuestion.questionId === question.questionId)
                    setActiveQuestion("");
                  dispatch(AuthActions.deleteQuestion(question.questionId));
                }}
              >
                <AiFillDelete />
              </AddQuizDeleteButton>
            </div>
          );
        })}
        <br />
        {screenSize.width >= 800 ? (
          <Button
            onClick={() =>
              dispatch(AuthActions.addQuestion(createNewQuestion()))
            }
          >
            Add Question
          </Button>
        ) : (
          <AddQuizHeading
            onClick={() =>
              dispatch(AuthActions.addQuestion(createNewQuestion()))
            }
            style={{ fontSize: "30px", textAlign: "center" }}
            active
          >
            +
          </AddQuizHeading>
        )}
      </AddQuizSidebar>
      <AddQuizContent>
        {activeQuestion && (
          <>
            <AddQuizHeading active>Design Question</AddQuizHeading>
            <TextArea
              rows="6"
              type="text"
              value={activeQuestion.value}
              onChange={(e) =>
                setActiveQuestion({ ...activeQuestion, value: e.target.value })
              }
              onBlur={(e) => handleUpdateQuestion("question", e.target.value)}
              inputContainerStyle={{ width: "100%" }}
            />
            <div style={{ margin: "30px" }}>
              <label
                style={{
                  background: "#1282e3",
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Upload Image
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  onBlur={(e) =>
                    handleUpdateQuestion("question", e.target.value)
                  }
                  inputContainerStyle={{ display: "none" }}
                />
              </label>
            </div>
            <img src={selectedFile} style={{ width: "300px" }} />
            {Object.values(activeQuestion?.options || {})?.map(
              (option, index) => {
                return (
                  <AddQuizOptionContainer key={option.optionId}>
                    <AddQuizHeading
                      style={{
                        marginRight: "30px",
                        minWidth: screenSize.width >= 800 ? "100px" : "auto",
                      }}
                      active
                    >
                      {screenSize.width >= 800
                        ? `Option ${index + 1}`
                        : index + 1}
                    </AddQuizHeading>
                    <Input
                      value={activeQuestion.options[option.optionId].value}
                      onChange={(e) =>
                        setActiveQuestion({
                          ...activeQuestion,
                          options: {
                            ...activeQuestion.options,
                            [option.optionId]: {
                              optionId: option.optionId,
                              value: e.target.value,
                            },
                          },
                        })
                      }
                      onBlur={(e) =>
                        handleUpdateQuestion(
                          "option",
                          e.target.value,
                          option.optionId
                        )
                      }
                      inputContainerStyle={{ width: "100%" }}
                    />
                    {Object.values(activeQuestion?.options).length > 2 && (
                      <AddQuizDeleteButton
                        onClick={() => {
                          delete activeQuestion.options[option.optionId];
                          dispatch(
                            AuthActions.deleteOption({
                              optionId: option.optionId,
                              questionId: activeQuestion.questionId,
                            })
                          );
                        }}
                      >
                        <AiFillDelete />
                      </AddQuizDeleteButton>
                    )}
                  </AddQuizOptionContainer>
                );
              }
            )}
            <br />
            {Object.keys(activeQuestion.options).length < 6 && (
              <Button
                onClick={() => {
                  const newOption = createNewOption();
                  setActiveQuestion({
                    ...activeQuestion,
                    options: {
                      ...activeQuestion.options,
                      [newOption.optionId]: newOption,
                    },
                  });
                  dispatch(
                    AuthActions.addOption({
                      option: newOption,
                      questionId: activeQuestion.questionId,
                    })
                  );
                }}
              >
                Add Option
              </Button>
            )}
          </>
        )}
        {!activeQuestion && (
          <div style={{ color: "red", fontSize: "20px" }}>
            Please Select a Question to Edit it.
          </div>
        )}
      </AddQuizContent>
    </AddQuizContainer>
  );
};

export default AddQuiz;
