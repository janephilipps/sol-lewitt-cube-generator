import React from "react";
import "./App.css";
import { cssColorKeywords } from "./cssColorKeywords";

class Canvas extends React.Component {
  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const DEFAULT_CUBE_WIDTH = 200;
    const half = DEFAULT_CUBE_WIDTH / 2;
    const oneAndAHalf = DEFAULT_CUBE_WIDTH * 1.5;
    const two = DEFAULT_CUBE_WIDTH * 2;
    const oneFifth = DEFAULT_CUBE_WIDTH / 5;
    const oneTenth = DEFAULT_CUBE_WIDTH / 10;
    const twoAndAHalf = DEFAULT_CUBE_WIDTH * 2.5;
    const oneAndAQuarter = DEFAULT_CUBE_WIDTH * 1.25;
    const threeQuarters = DEFAULT_CUBE_WIDTH * 0.75;
    const oneAndThreeQuarters = DEFAULT_CUBE_WIDTH * 1.75;
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
    } = this.props;

    // Initialize the canvas
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    const drawLines = obj => {
      if (obj.fill) {
        ctx.fillStyle = obj.color;
      } else {
        ctx.strokeStyle = obj.color;
      }
      ctx.beginPath();
      ctx.moveTo(obj.start.x, obj.start.y);
      if (obj.linePoint) {
        ctx.lineTo(obj.linePoint.x, obj.linePoint.y);
      } else {
        obj.linePoints.forEach(linePoint => {
          ctx.lineTo(linePoint.x, linePoint.y);
        });
      }
      if (obj.fill) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    };

    const drawBackground = (backgroundColor, backgroundLineColor) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, twoAndAHalf, twoAndAHalf);
      for (let i = 0; i < half - 1; i++) {
        drawLines({
          color: backgroundLineColor,
          fill: false,
          start: {
            x: 5 + 5 * i,
            y: 0
          },
          linePoint: {
            x: 5 + 5 * i,
            y: twoAndAHalf
          }
        });
      }
    };

    const drawCubeFaceOutline = (color, fill) => {
      drawLines({
        color,
        fill,
        start: {
          x: half,
          y: threeQuarters
        },
        linePoints: [
          {
            x: oneAndAHalf,
            y: threeQuarters
          },
          {
            x: oneAndAHalf,
            y: oneAndThreeQuarters
          },
          {
            x: half,
            y: oneAndThreeQuarters
          },
          {
            x: half,
            y: threeQuarters
          }
        ]
      });
    };

    const drawCubeTopOutline = (color, fill) => {
      drawLines({
        color,
        fill,
        start: {
          x: half,
          y: threeQuarters
        },
        linePoints: [
          {
            x: DEFAULT_CUBE_WIDTH,
            y: half
          },
          {
            x: two,
            y: half
          },
          {
            x: oneAndAHalf,
            y: threeQuarters
          }
        ]
      });
    };

    const drawCubeSideOutline = (color, fill) => {
      drawLines({
        color,
        fill,
        start: {
          x: oneAndAHalf,
          y: threeQuarters
        },
        linePoints: [
          {
            x: two,
            y: half
          },
          {
            x: two,
            y: oneAndAHalf
          },
          {
            x: oneAndAHalf,
            y: oneAndThreeQuarters
          }
        ]
      });
    };

    const drawCubeOutline = color => {
      drawCubeFaceOutline(color, false);
      drawCubeTopOutline(color, false);
      drawCubeSideOutline(color, false);
    };

    const fillCubeFace = color => {
      drawCubeFaceOutline(color, true);
    };

    const fillCubeTop = color => {
      drawCubeTopOutline(color, true);
    };

    const fillCubeSide = color => {
      drawCubeSideOutline(color, true);
    };

    const drawCubeFaceLines = color => {
      for (let i = 1; i < oneFifth; i++) {
        drawLines({
          color,
          fill: false,
          start: {
            x: half,
            y: threeQuarters + 5 * i
          },
          linePoint: {
            x: oneAndAHalf,
            y: threeQuarters + 5 * i
          }
        });
      }
    };

    const drawCubeTopLines = color => {
      for (let i = 1; i < oneTenth; i++) {
        drawLines({
          color,
          fill: false,
          start: {
            x: half + 10 * i,
            y: threeQuarters
          },
          linePoint: {
            x: DEFAULT_CUBE_WIDTH + 10 * i,
            y: half
          }
        });
      }
    };

    const drawSideLines = color => {
      for (let i = 1; i < 11; i++) {
        drawLines({
          color,
          fill: false,
          start: {
            x: two - 10 * i,
            y: half + 5 * i
          },
          linePoint: {
            x: two,
            y: half + 10 * i
          }
        });
      }

      for (let i = 1; i < 11; i++) {
        drawLines({
          color,
          fill: false,
          start: {
            x: oneAndAHalf,
            y: threeQuarters + 10 * i
          },
          linePoint: {
            x: two,
            y: DEFAULT_CUBE_WIDTH + 10 * i
          }
        });
      }

      for (let i = 1; i < 11; i++) {
        drawLines({
          color,
          fill: false,
          start: {
            x: oneAndAHalf,
            y: oneAndAQuarter + 10 * i
          },
          linePoint: {
            x: two - 10 * i,
            y: oneAndAHalf + 5 * i
          }
        });
      }
    };

    const drawCube = (
      cubeFaceColor,
      cubeTopColor,
      cubeSideColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor,
      cubeOutlineColor
    ) => {
      fillCubeFace(cubeFaceColor);
      fillCubeTop(cubeTopColor);
      fillCubeSide(cubeSideColor);
      drawCubeFaceLines(cubeFaceLineColor);
      drawCubeTopLines(cubeTopLineColor);
      drawSideLines(cubeSideLineColor);
      drawCubeOutline(cubeOutlineColor);
    };

    const draw = ({
      backgroundColor,
      backgroundLineColor,
      cubeFaceColor,
      cubeTopColor,
      cubeSideColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor,
      cubeOutlineColor
    }) => {
      drawBackground(backgroundColor, backgroundLineColor);
      drawCube(
        cubeFaceColor,
        cubeTopColor,
        cubeSideColor,
        cubeFaceLineColor,
        cubeTopLineColor,
        cubeSideLineColor,
        cubeOutlineColor
      );
    };

    draw({
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
  }

  render() {
    return <canvas ref="canvas" width={500} height={500} />;
  }
}

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
          {inputs.map(name => (
            <div className="colorPicker">
              <label htmlFor={name}>{name}</label>
              <select id={name} name={name} onChange={this.handleChange}>
                {cssColorKeywords.map(color => {
                  const optionStyle = {
                    backgroundColor: color,
                    color: color
                  };

                  if (color === "lightgrey") {
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
          ))}
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
