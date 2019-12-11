import React from 'react';
import './App.css';

const cssColorKeywords = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
];

class Canvas extends React.Component {

  componentDidMount() {
    this.drawCube();
  }

  componentDidUpdate() {
    this.drawCube();
  }

  drawCube() {
    console.log('CANVAS COMPONENT DID MOUNT');
    console.log(this.props);
    const { backgroundColor, backgroundLineColor, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor } = this.props;
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(100, 100, 200, 200);

    const drawBackground = (dimension, color) => {
      ctx.strokeStyle = color;
      for (let i = 0; i < dimension / 2 - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(5 + 5 * i, 0);
        ctx.lineTo(5 + 5 * i, dimension * 2.5);
        ctx.stroke();
      }
    };

    const drawCubeOutline = dimension => {
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const two = dimension * 2;
      const oneFourth = dimension / 4;
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

    const fillCube = dimension => {
      const half = dimension / 2;
      const oneAndAHalf = dimension * 1.5;
      const two = dimension * 2;
      const oneFourth = dimension / 4;
      ctx.fillStyle = "lightgrey";
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

    const drawFirstCube = (
      dimension,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor
    ) => {
      fillCube(dimension);
      drawCubeFaceLines(dimension, cubeFaceLineColor);
      drawCubeTopLines(dimension, cubeTopLineColor);
      drawSideLines(dimension, cubeSideLineColor);
      drawCubeOutline(dimension);
    };

    const draw = (dimension, backgroundColor, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor) => {
      drawBackground(dimension, backgroundColor);
      drawFirstCube(dimension, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor);
    };

    draw(200, backgroundColor, cubeFaceLineColor, cubeTopLineColor, cubeSideLineColor);

  }

  render() {
    console.log('CANVAS RENDER');
    return(
      <canvas ref="canvas" width={500} height={500} />
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "aliceblue",
      backgroundLineColor: "aliceblue",
      cubeFaceLineColor: "aliceblue",
      cubeTopLineColor: "aliceblue",
      cubeSideLineColor: "aliceblue"
    };
  }

  handleChange = (e) => {
    console.log('HANDLE CHANGE');
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
    console.log('STATE', this.state);
  }
  render() {
    const {
      backgroundColor,
      backgroundLineColor,
      cubeFaceLineColor,
      cubeTopLineColor,
      cubeSideLineColor
    } = this.state;
    return (
      <div>
        <h1>Sol Lewitt Cube Generator</h1>
        <div className="form">
          <select name="backgroundColor" onChange={this.handleChange}>
            {cssColorKeywords.map(color => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
          <select name="backgroundLineColor" onChange={this.handleChange}>
            {cssColorKeywords.map(color => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
          <select name="cubeFaceLineColor" onChange={this.handleChange}>
            {cssColorKeywords.map(color => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
          <select name="cubeTopLineColor" onChange={this.handleChange}>
            {cssColorKeywords.map(color => (
              <option value={color} key={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Canvas
            backgroundColor={backgroundColor}
            backgroundLineColor={backgroundLineColor}
            cubeFaceLineColor={cubeFaceLineColor}
            cubeTopLineColor={cubeTopLineColor}
            cubeSideLineColor={cubeSideLineColor}
          />
        </div>
      </div>
    );
  }
}

export default App;
