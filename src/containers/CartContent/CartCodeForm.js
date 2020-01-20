import React from 'react';
import styled from '@emotion/styled';

import { I18n } from '../../i18n';
import InputText from '../../components/common/InputText';
import Button from '../../components/common/Button';

const CardFormWrapper = styled.div`
  display: flex;
  input {
    width: 100%;
    font-size: 1.6rem;
  }
  @media ${ props => props.theme.media.md } {
    margin-bottom: 3rem;
  }
`;

const CardCodeForm = () => {
  return (
    <CardFormWrapper>
      <InputText placeholder={I18n('Cart code', true)} />
      <Button bgColorHover="#ee582a" bgColor="#91c400" color="#fff" css={{ cursor: 'pointer' }}>
        {I18n('Activate')}
      </Button>
    </CardFormWrapper>
  );
};

export default CardCodeForm;
