function item(context) {
  let x = 0;
  let y = 0;
  let alpha = 0;
  let scale = 1;
  let children = [];

  let matrix = new DOMMatrix(),
    inverse,
    initialGrabbed;
  let needupdate = false;
  let obj_infos = {};
  let touchId;
  let color;

  function append(c) {
    children.push(c);
  }

  function getMatrix() {
    update();
    return matrix;
  }

  function isTouched(pointer, identifier) {
    let movingMatrix = pointer.getMatrix();

    let localInverse = DOMMatrix.fromMatrix(matrix);
    localInverse.invertSelf(); // die Inverse des lokalen Koord.Sys.

    let localTouchPoint = localInverse.transformPoint(new DOMPoint(movingMatrix.e, movingMatrix.f));
    if (context.isPointInPath(obj_infos.path, localTouchPoint.x, localTouchPoint.y)) {
      touchId = identifier;
      obj_infos.fillStyle = "orange";

      inverse = new DOMMatrix(movingMatrix);
      inverse.invertSelf();

      initialGrabbed = new DOMMatrix(matrix);
      initialGrabbed.preMultiplySelf(inverse);
      return true;
    }
    return false;
  }

  function grab(pointer, identifier) {
    if (touchId === identifier) {
      matrix = new DOMMatrix(initialGrabbed);
      matrix.preMultiplySelf(pointer.getMatrix());

      x = matrix.e;
      y = matrix.f;
    }
  }

  function touchEnd(identifier) {
    if (touchId === identifier) {
      obj_infos.fillStyle = this.color;
      touchId = undefined;
    }
  }

  // Erfrischung der Matrix
  function update() {
    if (needupdate) {
      matrix = new DOMMatrix();
      matrix.translateSelf(x, y);
      matrix.rotateSelf(alpha);
      matrix.scaleSelf(scale);
    }
  }

  function move(nx, ny) {
    x = nx;
    y = ny;
    needupdate = true;
  }

  function rotate(na) {
    alpha = na;
    needupdate = true;
  }

  function rotateRadians(na) {
    alpha = (na * 180) / Math.PI;
    needupdate = true;
  }

  function setScale(sc) {
    scale = sc;
    needupdate = true;
  }

  //function to get the x coordinate of the object
  function getX() {
    return x;
  }

  //function to get the x coordinate of the object
  function getY() {
    return y;
  }

  function setX(x) {
    x = x;
    needupdate = true;
  }

  function setY(y) {
    y = y;
    needupdate = true;
  }

  function draw(parent) {
    update();

    let local = DOMMatrix.fromMatrix(parent);
    local.multiplySelf(matrix);

    // Kind-Objekte zeichnet
    for (let c of children) {
      context.save();
      c.draw(local);
      context.restore();
    }
    // Eltern-Objekt wird danach gezeichnet
    context.setTransform(local);
  }

  return {
    move: move,
    rotate: rotate,
    grab,
    isTouched,
    touchEnd,
    getMatrix,
    draw,
    append,
    setScale,
    obj_infos,
    rotateRadians,
    getX,
    getY,
    setX,
    setY,
  };
}

function rect_path() {
  let rectpath = new Path2D();
  rectpath.moveTo(-2, -2);
  rectpath.lineTo(-2, 2);
  rectpath.lineTo(2, 2);
  rectpath.lineTo(2, -2);
  rectpath.closePath();
  return rectpath;
}

export function circle(context, radius, fillStyle, text = "Circle") {
  let o = item(context);

  let pre = o.draw;
  o.draw = function (parent) {
    pre(parent);
    context.fillStyle = fillStyle;
    let endAngle = Math.PI * 2; // End point on circle
    context.beginPath();
    context.arc(0, 0, radius, 0, endAngle, true);
    context.fill();

    context.fillStyle = "#fff";
    context.fillText(text, 10, -10);
  };
  return o;
}

export function rect(context, scale, fillStyle) {
  let o = item(context);
  o.obj_infos.path = rect_path();
  o.obj_infos.fillStyle = fillStyle;
  o.color = fillStyle;
  let pre = o.draw;
  o.setScale(scale);
  o.draw = function (m) {
    pre(m);
    context.fillStyle = o.obj_infos.fillStyle;
    context.strokeStyle = "white";
    context.lineWidth = 0.1;
    context.stroke(o.obj_infos.path);
    context.fill(o.obj_infos.path);
    context.resetTransform();
  };
  return o;
}

export function rectFrame(context, scale, fillStyle) {
  let o = item(context);
  o.obj_infos.path = rect_path();
  o.obj_infos.fillStyle = fillStyle;
  o.color = fillStyle;
  let pre = o.draw;
  o.setScale(scale);
  o.draw = function (m) {
    pre(m);
    context.fillStyle = o.obj_infos.fillStyle;
    context.strokeStyle = "white";
    context.lineWidth = 0.1;
    context.stroke(o.obj_infos.path);
    context.resetTransform();
  };
  return o;
}

export function getCanvas(id) {
  let canvas = document.getElementById(id);
  let context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;
  return context;
}
