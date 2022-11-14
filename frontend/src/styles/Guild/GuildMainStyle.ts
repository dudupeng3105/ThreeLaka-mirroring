import styled from 'styled-components';

export const GuildMainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vh auto;
  padding: 3vh;
  width: 75vw;
`;

export const GuildBlueArcodian = styled.div`
  width: 26vw;
  position: relative;
  height: 7vh;
  padding: 1vh 1vw;
  font-size: 2vmin;
  color: black;
  background: #dbecff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 2vmin;
  transition: height 0.5s ease-in-out;
  margin-bottom: 1vh;
  &:hover {
    height: 25vh;
    transition: height 0.5s ease-in-out;
    .arcodian-item {
      visibility: visible;
      opacity: 1;
      transition: all 0.2s ease-in-out;
      transition-delay: 0.3s;
    }
  }
`;

export const GuildBlueArcodianItem = styled.div`
  width: 24vw;
  position: absolute;
  height: 14vh;
  padding: 0vh 1vw;
  font-size: 2vmin;
  top: 9vh;
  color: black;
  background: white;
  border: 1px solid black;
  visibility: hidden;
  opacity: 0;
`;
