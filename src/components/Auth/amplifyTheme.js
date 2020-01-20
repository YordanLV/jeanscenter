
// UI template API:
// https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react/src/Amplify-UI/Amplify-UI-Theme.jsx
export const Container = {
  fontFamily: `"Century Gothic W01", sans-serif`,
  fontWeight: '400',
};

export const FormContainer = {
  textAlign: 'center',
  marginTop: '0',
  margin: '0',
};

export const FormSection = {
  width: '100%',
  position: 'relative',
  marginBottom: '20px',
  backgroundColor: '#fff',
  padding: '0',
  textAlign: 'left',
  display: 'inline-block',
  borderRadius: 'none',
  boxShadow: 'none'
};

export const FormField = {
  marginBottom: '22px',
};

export const SectionHeader = {
  color: '#444a55',
  marginBottom: '20px',
  fontFamily: `"Century Gothic W01 Bold", sans-serif`,
  fontSize: '32px',
};

export const SectionBody = {
  marginBottom: '30px',
};

export const SectionFooter = {
  fontSize: '16px',
  color: '#444a55',
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'flex-start',
};

export const SectionFooterPrimaryContent = {
  marginLeft: 'auto'
};

export const SectionFooterSecondaryContent = {
  marginRight: 'auto',
  alignSelf: 'center',
};

export const Input = {
  display: 'block',
  width: '100%',
  padding: '11px 12px',
  fontSize: '16px',
  fontFamily: `"Century Gothic W01", sans-serif`,
  color: '#444a55',
  // backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #d0d2d4',
  borderRadius: '0',
  boxSizing: 'border-box',
  marginBottom: '10px'
};

export const Button = {
  minWidth: '153px',
  display: 'inline-block',
  marginBottom: '0',
  fontFamily: `"Century Gothic W01 Bold", sans-serif`,
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '1.42857143',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundImage: 'none',
  color: '#fff',
  backgroundColor: '#91c400',
  borderColor: '#91c400',
  textTransform: 'uppercase',
  padding: '11px 30px',
  letterSpacing: '1.1px',
  border: 'none',
};

export const SignInButton = {
  position: 'relative',
  width: '100%',
  borderRadius: '0',
  marginBottom: '10px',
  cursor: 'pointer',
  padding: 0,
  fontFamily: `"Century Gothic W01 Bold", sans-serif`,
  color: '#fff',
  fontSize: '16px',
  '#google_signin_btn': {
    backgroundColor: '#4285F4',
    fontFamily: 'Roboto',
    border: '1px solid #4285F4'
  },
  '#facebook_signin_btn': {
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
  },
  '#amazon_signin_btn': {
    backgroundColor: '#91c400',
    border: 'none',
  }
};

export const SignInButtonIcon = {
  position: 'absolute',
  left: 0,
  '#google_signin_btn_icon': {
    backgroundColor: '#fff',
    borderRadius: '4px 0 0 4px',
    height: '30px',
    width: '30px',
    padding: '11px',
  },
  '#facebook_signin_btn_icon': {
    height: '33px',
    width: '18px',
    padding: '10px 14px'
  },
  '#amazon_signin_btn_icon': {
    padding: '10px',
    height: '32px',
    width: '32px',
  }
};

export const SignInButtonContent = {
  display: 'block',
  padding: '11px 30px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
};

export const Strike = {
  width: '100%',
  textAlign: 'center',
  borderBottom: '1px solid #bbb',
  lineHeight: '0.1em',
  margin: '32px 0',
  color: '#444a55',
};

export const StrikeContent = {
  background: '#fff',
  padding: '0 25px',
  fontSize: '14px',
  fontWeight: '500',
};

export const ActionRow = {
  marginBottom: '15px'
};

export const FormRow = {
  marginBottom: '12px'
};

export const A = {
  color: '#91c400',
  cursor: 'pointer',
};

export const Hint = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  marginTop: '20px',
  color: '#444a55',
  fontSize: '16px',
};

export const Radio = {
  marginRight: '18px',
  verticalAlign: 'bottom',
};

export const InputLabel = {
  color: '#444a55',
  fontSize: '16px',
  marginBottom: '8px',
};

export const Toast = {
  zIndex: 1,
  background: '#444a55',
  fontSize: '16px'
};

const Theme = {
  container: Container,
  formContainer: FormContainer,
  formSection: FormSection,
  formField: FormField,

  sectionHeader: SectionHeader,
  sectionBody: SectionBody,
  sectionFooter: SectionFooter,
  sectionFooterPrimaryContent: SectionFooterPrimaryContent,
  sectionFooterSecondaryContent: SectionFooterSecondaryContent,

  input: Input,
  button: Button,
  signInButton: SignInButton,
  signInButtonIcon: SignInButtonIcon,
  signInButtonContent: SignInButtonContent,
  formRow: FormRow,
  strike: Strike,
  strikeContent: StrikeContent,
  actionRow: ActionRow,
  a: A,
  toast: Toast,

  hint: Hint,
  radio: Radio,
  inputLabel: InputLabel,
};

export default Theme;
