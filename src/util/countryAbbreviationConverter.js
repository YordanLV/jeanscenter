import { I18n } from "../i18n";

const countryAbbreviationConverter = abbreviation => {
  switch (abbreviation) {
    case "BE":
      return I18n("Belgium");
    default:
      return abbreviation;
  }
};

export default countryAbbreviationConverter;
