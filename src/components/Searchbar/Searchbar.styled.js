import styled, { css } from 'styled-components';

export const Header = styled.header`
  box-sizing: border-box;
  display: flex;

  background-color: #e3d5ef;
  padding: 10px 0;

  justify-content: center;
`;

export const SearchForm = styled.form`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 30%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const Button = styled.button`
  padding: 0;
  display: inline-block;
  width: 45px;
  height: 45px;
  border: 0;
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;
export const Svg = css`
  width: 30px;
  height: 30px;
`;

export const SearchLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;

export const SearchInput = styled.input`
  display: inline-block;
  width: calc(100%-45px);
  font: inherit;
  font-size: 18px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;
