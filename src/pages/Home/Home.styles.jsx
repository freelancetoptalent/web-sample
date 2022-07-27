import styled from "styled-components";
import {device} from "../../themes/Breakpoints"
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
`;
export const ContentWrap = styled.div`
  display: flex;
  align-items: flex-start;
  @media ${device.laptop} {
    align-items: center;
  }
  
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    &.content-img {
      display: none;
    }
  }
`;
export const ContentItem = styled.div`
  margin-bottom: 100px;
  width: 100%;
  max-width: 750px;
  :last-child {
    margin-bottom: 0px;
  }
 
`;


export const Form = styled.form`
  
  label {
    display: block;
    width: 100%;
    color: #0F283D;
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 16px;
  }
  input {
    width: 100%;
    border: 1px solid #C5C5C5;
    border-radius: 8px;
    padding:11px 48px 15px 18px;
    ::placeholder {
      font-size: 16px;
      line-height: 18px;
      color: #818183;
      font-weight: 400;
    }
  }
  .input-info {
    margin-top: 4px;
    margin-bottom: 20px;
  }
`;
export const ImgWrap = styled.div`
  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: auto;
    max-width: 795px;
  }
`
export const Text = styled.p`
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 28px;

`;