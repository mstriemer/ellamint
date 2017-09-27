class EllamintCounter extends Ellamint {
  onClick(event) {
    if (event.target.tagName == "BUTTON") {
      this.setProperty(({count}) => ({
        count: count + 1,
      }));
    }
  }

  static get defaultProps() {
    return {
      count: 0,
    };
  }

  static get propTypes() {
    return {
      count: "int",
    };
  }

  static get observedAttributes() {
    return ["count"];
  }

  render() {
    const { count } = this.props;

    const counter = document.createElement("span");
    counter.textContent = count;
    this.shadowRoot.appendChild(counter);

    const button = document.createElement("button");
    button.textContent = "+";
    this.shadowRoot.appendChild(button);
  }
};

customElements.define("ellamint-counter", EllamintCounter);
