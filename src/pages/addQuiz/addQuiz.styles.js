import styled from "styled-components";

export const AddQuizContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddQuizSidebar = styled.div`
  background-color: #92d5f7;
  width: 70%;
  height: 100vh;
  padding: 40px;

  @media (max-width: 800px) {
    width: 80px;

    > div {
      /* display: none; */
    }
  }
`;

export const AddQuizContent = styled.div`
  background-color: #d6ecff;
  height: 100vh;
  width: 100%;
  padding: 40px;
`;

export const AddQuizHeading = styled.div`
  font-size: 22px;
  font-weight: ${props => props.active ? 'bold' : 'auto'};
  line-height: 50px;
`;

export const AddQuizOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const AddQuizDeleteButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
`;
