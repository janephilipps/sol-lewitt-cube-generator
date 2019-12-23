import React from "react";
import "./App.css";
import Canvas from "./Canvas";
import { cssColorKeywords } from "./cssColorKeywords";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "lightgrey",
      backgroundLineColor: "black",
      cubeFaceColor: "lightgrey",
      cubeTopColor: "lightgrey",
      cubeSideColor: "lightgrey",
      cubeFaceLineColor: "black",
      cubeTopLineColor: "black",
      cubeSideLineColor: "black",
      cubeOutlineColor: "black"
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    console.log("BUY A PRINT!");
  };

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  handleRandomizeClick = () => {
    const backgroundColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const backgroundLineColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeFaceColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeTopColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeSideColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeFaceLineColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeTopLineColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeSideLineColor = cssColorKeywords[this._getRandomInt(0, 147)];
    const cubeOutlineColor = cssColorKeywords[this._getRandomInt(0, 147)];

    this.setState({
      backgroundColor,
      backgroundLineColor,
      cubeFaceColor,
      cubeTopColor,
      cubeSideColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor,
      cubeOutlineColor
    });
  };

  render() {
    const {
      backgroundColor,
      backgroundLineColor,
      cubeFaceColor,
      cubeTopColor,
      cubeSideColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor,
      cubeOutlineColor
    } = this.state;

    const inputs = [
      "backgroundColor",
      "backgroundLineColor",
      "cubeFaceColor",
      "cubeTopColor",
      "cubeSideColor",
      "cubeFaceLineColor",
      "cubeTopLineColor",
      "cubeSideLineColor",
      "cubeOutlineColor"
    ];

    return (
      <div>
        <h1>Sol Lewitt Cube Generator</h1>
        <div className="form">
          {inputs.map(name => {
            const splitName = name.split(/(?=[A-Z])/);
            const splitNameFirstWordCapitalized =
              splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
            splitName.shift();
            splitName.unshift(splitNameFirstWordCapitalized);
            const formattedName = splitName.join(" ");
            return (
              <div className="colorPicker">
                <label htmlFor={name}>{formattedName}:&nbsp;</label>
                <select id={name} name={name} onChange={this.handleChange}>
                  {cssColorKeywords.map(color => {
                    const optionStyle = {
                      backgroundColor: color,
                      color: color
                    };

                    if (color === this.state[name]) {
                      return (
                        <option
                          value={color}
                          key={color}
                          style={optionStyle}
                          selected
                        >
                          {color}
                        </option>
                      );
                    } else {
                      return (
                        <option value={color} key={color} style={optionStyle}>
                          {color}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            );
          })}
          <button onClick={this.handleRandomizeClick}>Randomize!</button>
        </div>
        <div>
          <Canvas
            backgroundColor={backgroundColor}
            backgroundLineColor={backgroundLineColor}
            cubeFaceColor={cubeFaceColor}
            cubeTopColor={cubeTopColor}
            cubeSideColor={cubeSideColor}
            cubeFaceLineColor={cubeFaceLineColor}
            cubeTopLineColor={cubeTopLineColor}
            cubeSideLineColor={cubeSideLineColor}
            cubeOutlineColor={cubeOutlineColor}
          />
        </div>
        <button onClick={this.handleClick}>Buy a Print!</button>
      </div>
    );
  }
}

export default App;
