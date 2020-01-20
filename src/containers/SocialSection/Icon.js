import styled from '@emotion/styled';

const Icon = styled.div`
    display: flex;
    padding: 0 1rem;
    font-style: normal;
    font-size: 3rem;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:before{
        color: #fff;
        margin-right:0.4rem;
        font-family: icomoon-jc!important;
        content: "\\${ props => props.icon }";
    }
    span {
        display: none;
        align-self: center;
        padding-left: 1rem;
        color: #fff;
        font-size: 1.6rem;
        font-weight: 600;
        @media ${ 'screen and (min-width: 1400px)' }{
            display: block;
        }
    }
`;

export default Icon;
