import styled from '@emotion/styled';

const FooterTitle = styled.div`
  margin-right: 1.8rem;
  color: #fff;
  font-size: 2.2rem;
  font-family: 'Century Gothic W01', sans-serif;
  text-transform: uppercase;
  white-space: nowrap;
  span {
    font-family: 'Century Gothic W01 Bold', sans-serif;
    color: ${ props => props.theme.color.mainGreen };
  }
`;

export default FooterTitle;
