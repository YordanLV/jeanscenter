import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { RichText } from 'prismic-reactjs';
import localStorage from '../../util/localstorage';

import { I18n } from '../../i18n';
import Close from '../../components/Close';

const MarketingMessageWrapper = styled.div`
  position: relative;
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
  padding: 1.5rem;
  background: #fff;
`;

const MarketingMessageContent = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0;
  }
`;

const MarketingMessageText = styled.div`
  display: flex;
  align-self: center;
  padding-right: 2rem;
  color: ${ props => props.theme.color.mainGray };
  font-size: 1.6rem;
  text-transform: uppercase;
`;

@inject('authStore')
@observer
class MarketingMessage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      displayStatus: 'block',
      name: ''
    };
  }

  hideMessage = () => {
    this.setState({ displayStatus: 'none' });
  };

  render () {
    return (
      <MarketingMessageWrapper css={{ display: this.state.displayStatus }}>
        <Container>
          <Row>
            <Col>
              <MarketingMessageContent>
                <MarketingMessageText>
                  {this.props.authStore.authState !== 'signIn' && localStorage.getItem('name') && (
                    <span>
                      {I18n('Hello')} {localStorage.getItem('name')},&nbsp;
                    </span>
                  )}
                  {RichText.render(this.props.data.primary.message)}
                </MarketingMessageText>
                <Close onClick={this.hideMessage} />
              </MarketingMessageContent>
            </Col>
          </Row>
        </Container>
      </MarketingMessageWrapper>
    );
  }
}

MarketingMessage.propTypes = {
  data: PropTypes.object,
  userStore: PropTypes.shape({
    getUserData: PropTypes.func,
    userData: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  authStore: PropTypes.shape({
    authState: PropTypes.string
  })
};

export default MarketingMessage;
