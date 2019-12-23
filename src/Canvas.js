import React from "react";

export default class Canvas extends React.Component {
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
