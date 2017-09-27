class EllamintMultiCounter extends Ellamint {
  onClick(event) {
    if (event.target.tagName == "BUTTON") {
      this.setProperty(({counters}) => ({
        counters: counters + 1,
      }));
    }
  }

  static get defaultProps() {
    return {
      counters: 1,
    };
  }

  static get propTypes() {
    return {
      counters: "int",
    };
  }

  static get observedAttributes() {
    return ["counters"];
  }

  render() {
    const { counters } = this.props;

    const elements = [
      this.el("div", {}, [
        this.el("span", {}, ["Counters!"]),
        this.el("button", {}, ["Add counter"]),
      ]),
    ];

    for (let i = 0; i < counters; i++) {
      elements.push(
        this.el("div", {}, [
          this.el("ellamint-counter", {count: i, key: i}, []),
        ]));
    }

    return elements;
  }
}

customElements.define("ellamint-multi-counter", EllamintMultiCounter);
