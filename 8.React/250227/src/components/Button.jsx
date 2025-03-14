import styled from "styled-components";

// <button></button>
const StyledButton = styled.button`
    background: ${(props) => props.color};
`

export default StyledButton;

/*
    styled.button: styled에서 제공하는 button 태그에 스타일을
    적용할 수 있는 함수 즉, 버튼 태그 대신 사용할 수 있는 React 컴포넌트
    => 기존 <button> 태그를 확장하여 스타일이 적용된 새로운 버튼 컴포넌트
*/
