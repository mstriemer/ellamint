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

    // This syntax is sort of mimicking JSX so that it can use that later,
    // but it's really just an array of arrays.
    return [
      this.el("span", {}, [
        this.el("strong", {}, [count]),
      ]),
      this.el("button", {"class": "increment"}, ["+"]),
    ];
  }
};

customElements.define("ellamint-counter", EllamintCounter);
