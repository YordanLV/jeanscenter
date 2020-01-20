import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { uid } from "react-uid";

import Link from "../../components/Link";
import FooterWrapper from "./FooterWrapper";
import Column from "./Column";
import Legal from "./Legal";
import Logos from "./Logos";
import H4 from "../../components/common/H4";
import HR from "../../components/common/HR";
import Snackbar from "../../components/Snackbar";
import { I18n } from "../../i18n";

@inject("layoutStore")
@observer
class Footer extends Component {
  render() {
    const cmsLoaded = this.props.layoutStore.cmsLoaded;
    const cmsData = this.props.layoutStore.cmsFooterData;
    return (
      <FooterWrapper>
        <Container>
          {cmsLoaded && (
            <>
              <Row>
                {cmsData.map(col => (
                  <React.Fragment key={uid(col)}>
                    {col.slice_type === "footer_column" && (
                      <Col sm='12' lg='3'>
                        <Column>
                          <H4 fontSize='2.2rem'>
                            <Link to={col.primary.column_title_url.url}>
                              <strong>
                                {col.primary.column_title[0].text}
                              </strong>
                            </Link>
                          </H4>
                          <ul>
                            {col.items.map(item => (
                              <li key={uid(item)}>
                                <Link to={item.label_url.url}>
                                  {item.label[0].text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Column>
                      </Col>
                    )}
                  </React.Fragment>
                ))}
              </Row>
              <HR css={{ margin: "4rem 0" }} />
              <Row>
                {cmsData.map(item => (
                  <React.Fragment key={uid(item)}>
                    {item.slice_type !== "footer_column" && (
                      <>
                        {item.slice_type === "footer_logos" && (
                          <Col sm='12' lg='7'>
                            <Logos>
                              {item.items.map(logo => (
                                <Link
                                  to={logo.url.url}
                                  key={uid(logo)}
                                  alt='USP logo'
                                >
                                  <img height='35' src={logo.image.url} />
                                </Link>
                              ))}
                            </Logos>
                          </Col>
                        )}
                        {item.slice_type === "footer_legal_row" && (
                          <Col sm='12' lg='5'>
                            <Legal>
                              {item.items.map(legal => (
                                <Link to={legal.url.url} key={uid(legal)}>
                                  {legal.label[0].text}
                                </Link>
                              ))}
                            </Legal>
                          </Col>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </Row>
            </>
          )}
        </Container>
        <Snackbar
          message={I18n("Error message", true)}
          isShown={this.props.layoutStore.isError}
        />
      </FooterWrapper>
    );
  }
}

Footer.propTypes = {
  layoutStore: PropTypes.object
};

export default Footer;
