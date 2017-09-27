class Ellamint extends HTMLElement {
  constructor() {
    super();

    this.props = {};
    this.hasRendered = false;
  }

  connectedCallback() {
    this.setDefaultProps(); this.attachShadow({mode: "open"});
    this.attachEventHandlers();
    this.render();
    this.hasRendered = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // FIXME: This is hard-coded to EllamintCounter.
    const propType = EllamintCounter.propTypes[name];
    if (propType == "int") {
      this.props[name] = parseInt(newValue, 10);
    } else {
      this.props[name] = newValue;
    }
    if (this.hasRendered) {
      this.empty();
      this.render();
    }
  }

  attachEventHandlers() {
    if ("onClick" in this) {
      this.shadowRoot.addEventListener("click", this.onClick.bind(this));
    }
  }

  setDefaultProps() {
    Object.keys(EllamintCounter.defaultProps).forEach((name) => {
      if (!this.props.hasOwnProperty(name)) {
        // FIXME: This is hard-coded to EllamintCounter.
        this.props[name] = EllamintCounter.defaultProps[name];
      }
    });
  }

  setProperty(updater) {
    this.props = updater(this.props);
    this.empty();
    this.render();
  }

  empty() {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.firstChild.remove();
    }
  }
}
