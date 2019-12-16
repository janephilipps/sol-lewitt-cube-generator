import React from 'react';
import './App.css';
import { cssColorKeywords } from './cssColorKeywords';

class Canvas extends React.Component {

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  drawCanvas() {
    const { backgroundColor, backgroundLineColor, cubeBackgroundColor, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor } = this.props;

    // Initialize the canvas.
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");

    // maybe change "dimension" to "cubeWidth".

    const drawBackground = (dimension, backgroundColor, backgroundLineColor) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, 500, 500); // calculate in terms of dimension
      ctx.strokeStyle = backgroundLineColor;
      for (let i = 0; i < dimension / 2 - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(5 + 5 * i, 0);
        ctx.lineTo(5 + 5 * i, dimension * 2.5);
        ctx.stroke();

        // consider using drawLines
        // drawLines({
        //   ctx: ctx,
        //   start: {
        //     x: 5 + 5 * i,
        //     y: 0
        //   },
        //   linePoint: {
        //     x: 5 + 5 * i,
        //     y: dimension * 2.5,
        //   }
        // });
      }
    };

    // begin path
    // move to starting coordinate
    // at least one lineTo
    // stroke

    const drawLines = (obj) => {
      ctx.beginPath();
      ctx.moveTo(obj.start.x, obj.start.y);
      if (obj.linePoint) {
        ctx.lineTo(obj.linePoint.x, obj.linePoint.y);
      } else {
        obj.linePoints.forEach(linePoint => {
          ctx.lineTo(linePoint.x, linePoint.y);
        });
      }
      ctx.stroke();
    };

    const drawCubeOutline = dimension => {
      // perhaps extract these to the top of drawCanvas so we don't need to re-declare them 
      // in each sub-function.
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const two = dimension * 2;
      const oneFourth = dimension / 4;
      // Might be easier to turn this step into 3 sub-steps:
      // 1. draw front
      // 2. draw top
      // 3. draw side
      // I think it's fine to re-draw lines, i.e. the top front line

      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(half, half);
      ctx.lineTo(oneAndAHalf, half);
      ctx.lineTo(oneAndAHalf, oneAndAHalf);
      ctx.lineTo(half, oneAndAHalf);
      ctx.lineTo(half, half);
      ctx.lineTo(dimension, oneFourth);
      ctx.lineTo(two, oneFourth);
      ctx.lineTo(oneAndAHalf, half);
      ctx.moveTo(two, oneFourth);
      ctx.lineTo(two, dimension * 1.25);
      ctx.lineTo(oneAndAHalf, oneAndAHalf);
      ctx.stroke();
    };

    // Extract this and drawCubeOutline into a function that just takes whether
    // we're doing fill or stroke.
    const fillCube = (dimension, color) => {
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const two = dimension * 2;
      const oneFourth = dimension / 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(half, half);
      ctx.lineTo(oneAndAHalf, half);
      ctx.lineTo(oneAndAHalf, oneAndAHalf);
      ctx.lineTo(half, oneAndAHalf);
      ctx.fill();
      ctx.moveTo(half, half);
      ctx.lineTo(dimension, oneFourth);
      ctx.lineTo(two, oneFourth);
      ctx.lineTo(oneAndAHalf, half);
      ctx.fill();
      ctx.moveTo(two, oneFourth);
      ctx.lineTo(two, dimension * 1.25);
      ctx.lineTo(oneAndAHalf, oneAndAHalf);
      ctx.lineTo(oneAndAHalf, half);
      ctx.fill();
    };

    const drawCubeFaceLines = (dimension, color) => {
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const oneFifth = dimension / 5;
      ctx.strokeStyle = color;
      for (let i = 1; i < oneFifth; i++) {
        ctx.beginPath();
        ctx.moveTo(half, half + 5 * i);
        ctx.lineTo(oneAndAHalf, half + 5 * i);
        ctx.stroke();
      }
    };

    const drawCubeTopLines = (dimension, color) => {
      const half = dimension / 2;
      const oneTenth = dimension / 10;
      const oneFourth = dimension / 4;
      ctx.strokeStyle = color;
      for (let i = 1; i < oneTenth; i++) {
        ctx.beginPath();
        ctx.moveTo(half + 10 * i, half);
        ctx.lineTo(dimension + 10 * i, oneFourth);
        ctx.stroke();
      }
    };

    const drawSideLines = (dimension, color) => {
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const oneFourth = dimension / 4;
      const two = dimension * 2;
      ctx.strokeStyle = color;
      for (let i = 1; i < 11; i++) {
        ctx.beginPath();
        ctx.moveTo(two - 10 * i, oneFourth + 5 * i);
        ctx.lineTo(two, oneFourth + 10 * i);
        ctx.stroke();
      }

      for (let i = 1; i < 11; i++) {
        ctx.beginPath();
        ctx.moveTo(oneAndAHalf, half + 10 * i);
        ctx.lineTo(two, dimension * 0.75 + 10 * i);
        ctx.stroke();
      }

      for (let i = 1; i < 11; i++) {
        ctx.beginPath();
        ctx.moveTo(oneAndAHalf, dimension + 10 * i);
        ctx.lineTo(two - 10 * i, dimension * 1.25 + 5 * i);
        ctx.stroke();
      }
    };

    const drawCube = (
      dimension,
      cubeBackgroundColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor
    ) => {
      fillCube(dimension, cubeBackgroundColor);
      drawCubeFaceLines(dimension, cubeFaceLineColor);
      drawCubeTopLines(dimension, cubeTopLineColor);
      drawSideLines(dimension, cubeSideLineColor);
      drawCubeOutline(dimension);
    };

    const draw = (
      dimension,
      backgroundColor,
      backgroundLineColor,
      cubeBackgroundColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor
    ) => {
      drawBackground(dimension, backgroundColor, backgroundLineColor);
      drawCube(
        dimension,
        cubeBackgroundColor,
        cubeFaceLineColor,
        cubeTopLineColor,
        cubeSideLineColor
      );
    };

    draw(200, backgroundColor, backgroundLineColor, cubeBackgroundColor, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor);
    
    // Perhaps use object style parameters so they are named at call site.
    // draw({
    //   dimension: 200,
    //   backgroundColor: backgroundColor
    // });

  }

  render() {
    return(
      <canvas ref="canvas" width={500} height={500} />
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "lightgrey",
      backgroundLineColor: "black",
      cubeBackgroundColor: "lightgrey",
      cubeFaceLineColor: "black",
      cubeTopLineColor: "black",
      cubeSideLineColor: "black"
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClick = () => {
    console.log('BUY A PRINT!');
  }

  render() {
    const {
      backgroundColor,
      backgroundLineColor,
      cubeBackgroundColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor
    } = this.state;

    const inputs = [
      "backgroundColor",
      "backgroundLineColor",
      "cubeBackgroundColor",
      "cubeFaceLineColor",
      "cubeTopLineColor",
      "cubeSideLineColor"
    ];

    return (
      <div>
        <h1>Sol Lewitt Cube Generator</h1>
        <div className="form">
          {inputs.map(name => (
            <div className="colorPicker">
              <label htmlFor={name}>{name}</label>
              <select
                id={name}
                name={name}
                onChange={this.handleChange}
              >
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
        </div>
        <div>
          <Canvas
            backgroundColor={backgroundColor}
            backgroundLineColor={backgroundLineColor}
            cubeBackgroundColor={cubeBackgroundColor}
            cubeFaceLineColor={cubeFaceLineColor}
            cubeTopLineColor={cubeTopLineColor}
            cubeSideLineColor={cubeSideLineColor}
          />
        </div>
        <button onClick={this.handleClick}>Buy a Print!</button>
      </div>
    );
  }
}

export default App;
