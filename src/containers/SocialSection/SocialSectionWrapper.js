import styled from '@emotion/styled';

const SocialSectionWrapper = styled.div`
  width: 100%;
  padding: 4rem 0;
  margin-top: 1rem;
  background-color: ${ props => props.theme.color.mainGray || 'black' };
  @media ${ props => props.theme.media.lg } {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
  .social-section__right {
    @media ${ props => props.theme.media.lg } {
      display: flex;
      flex-wrap: wrap;
      margin-top: 2rem;
    }
  }
  form {
    display: flex;
    align-items: center;
    width: 100%;
    input {
      font-size: 1.6rem;
      &::placeholder {
        font-size: 1.6rem;
        color: ${ props => props.theme.color.silverGray };
      }
    }
    @media ${ props => props.theme.media.lg } {
      display: flex;
      flex-wrap: wrap;
    }
    @media ${ props => props.theme.media.md } {
      input {
        width: 100%;
        margin-top: 1.5rem;
        margin-left: 0;
      }
      input[type='submit'] {
        text-align: center;
        padding: 1.1rem 3rem;
      }
    }
  }
`;

export default SocialSectionWrapper;
