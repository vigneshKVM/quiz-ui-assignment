import React from 'react';
import * as S from './textArea.styles';

const TextArea = ({...props}) => {
  return (
    <S.CustomTextAreaContainer>
        <S.CustomTextArea {...props} />
    </S.CustomTextAreaContainer>
  )
}

export default TextArea