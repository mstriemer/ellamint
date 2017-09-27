class Ellamint extends HTMLElement {
  constructor() {
    super();

    this.props = {};
    this.willRender = false;
  }

  connectedCallback() {
    this.setDefaultProps();
    this.attachShadow({mode: "open"});
    this.attachEventHandlers();
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // FIXME: This is hard-coded to EllamintCounter.
    const propType = EllamintCounter.propTypes[name];
    if (propType == "int") {
      this.props[name] = parseInt(newValue, 10);
    } else {
      this.props[name] = newValue;
    }
    this.renderEventually();
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
    const updates = updater(this.props);
    Object.keys(updates).forEach((name) => {
      this.setAttribute(name, updates[name]);
    });
  }

  renderEventually() {
    if (!this.willRender) {
      this.willRender = true;
      requestAnimationFrame(() => {
        this._render();
        this.willRender = false;
      });
    }
  }

  _render() {
    IncrementalDOM.patch(this.shadowRoot, this._renderElements.bind(this));
  }

  _renderElements() {
    this.render().forEach((element) => this._renderElement(...element));
  }

  _renderElement(tagName, attrs, children) {
    const { elementOpen, elementClose, text } = IncrementalDOM;
    const {key, ...attributes} = attrs;
    const attrList = Object
      .keys(attributes)
      .map((attr) => [attr, attributes[attr]])
      .reduce((a, b) => a.concat(b), []);
    console.log(tagName, attrList);
    elementOpen(tagName, key || null, null, ...attrList);
    children.forEach((child) => {
      if (Array.isArray(child)) {
        this._renderElement(...child);
      } else {
        text(child);
      }
    });
    elementClose(tagName);
  }

  el(tagName, attrList, children) {
    return [tagName, attrList, children];
  }
}
