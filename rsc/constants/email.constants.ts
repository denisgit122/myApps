export enum EEmailActions {
  FORGOR_PASSWORD,
}

export const allTemplates = {
  [EEmailActions.FORGOR_PASSWORD]: {
    subject:
      "We controll your password, just follow all steps and everything will be good",
    templateName: "forgotPassword",
  },
};
