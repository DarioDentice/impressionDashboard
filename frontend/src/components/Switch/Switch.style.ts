import styled from 'styled-components';

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; // Sfondo grigio (spento)
  border-radius: 34px;
  transition: .4s;
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
  }
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${Slider} {
    background-color: #1890ff; // Blu (acceso)
  }
  &:checked + ${Slider}:before {
    transform: translateX(22px);
  }
`;