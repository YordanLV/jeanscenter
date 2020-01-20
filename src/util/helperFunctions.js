import { I18n } from "../i18n";

export const mapAttributesFromCTP = (attributes, lang = "nl-BE") => {
  const arrAttributesFromCTP = {
    brand: I18n("Brand", true),
    webcolor: I18n("Web Color", true),
    material: I18n("Material", true),
    gender: I18n("Gender", true),
    season: I18n("Season", true),
    fit: I18n("Fit", true),
    print: I18n("Print", true),
    articlename: I18n("Article Name", true),
    closure: I18n("Brand", true),
    lengthdescription: I18n("Length Description", true),
    waist: I18n("Waist", true),
    fabric: I18n("Fabric", true)
  };
  const result = attributes.map(attribute => {
    const resObj = {};
    if (Object.keys(arrAttributesFromCTP).includes(attribute.name)) {
      resObj.name = arrAttributesFromCTP[attribute.name];
      if (typeof attribute.value === "string") {
        if (attribute.name === "season") {
          const seasonyearArr = attributes.filter(
            attr => attr.name === "seasonyear"
          );
          const seasonyear =
            seasonyearArr.length > 0 ? seasonyearArr[0].value : "";
          resObj.value = `${attribute.value}  ${seasonyear}`;
        } else {
          resObj.value = attribute.value;
        }
      } else {
        resObj.value = attribute.value[lang];
      }
    }

    return resObj;
  });
  return result.filter(val => Object.entries(val).length > 0);
};
