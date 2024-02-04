import Bridge from "@ngnc/bridge";

// eslint-disable-next-line no-unused-vars

export const ngncLauncher = () => {
  const widget = new Bridge({
    key: "ngnc_p_tk_591b581c1f613cee9fa24ea395530ed1cbf360f755d4b01ebe085b0d0225d9a1",
    type: "link_ramp",
    onSuccess: (chargeObject) => {},
    onEvent: (eventName, data) => {},
  });
  widget.setup();
  widget.open();
};
