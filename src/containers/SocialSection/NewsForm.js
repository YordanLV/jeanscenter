import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import Link from "../../components/Link";
import { I18n } from "../../i18n";
import Button from "../../components/common/Button";

const NewsForm = () => {
  const [email, setEmail] = useState("");

  const SocialText = styled.div`
    display: none;
    color: #a1a4aa;
    width: 14.1rem;
    font-size: 1.1rem;
    font-family: "CenturyGothicW01-Italic";
    margin-left: 2rem;
    @media ${"screen and (min-width: 1400px)"} {
      display: block;
    }
  `;

  const inputStyles = {
    padding: "1rem",
    minWidth: "24rem",
    fontSize: "1.6rem"
  };

  return (
    <div css={{ display: "flex", height: "4.5rem" }}>
      <input
        name='email'
        onChange={e => setEmail(e.target.value)}
        placeholder={I18n("Jouw e-mailadres", true)}
        style={inputStyles}
      />
      <div css={{ display: "flex" }}>
        <Link to={`/newsletter?email=${email}`}>
          <Button
            bgColor={props => props.theme.color.mainGreen}
            bgColorHover={props => props.theme.color.primaryHover}
            paddingMobile='1rem 2rem'
            color='#fff'
            css={{ marginLeft: "2rem", padding: "1rem 2rem" }}
          >
            {I18n("Subscription", true)}
          </Button>
        </Link>
        <SocialText>
          {I18n("We never share your email address with others...")}
        </SocialText>
      </div>
    </div>
  );
};

NewsForm.propTypes = {
  theme: PropTypes.shape({
    color: PropTypes.shape({
      mainGreen: PropTypes.string,
      primaryHover: PropTypes.string
    })
  })
};

export default NewsForm;
