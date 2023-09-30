var size = parseInt(
  window.prompt(
    "Welcome, to N-Queen Puzzle Game. Please, Enter size of grid ranging from 4-29"
  )
);
while (size <= 0) {
  alert("Enter a Natural Number");
  let size = parseInt(window.prompt("Enter size of grid ranging from 4-29"));
}

document.write(
  "<br><br><h2><i><u>Grid Size: " +
    size +
    " X " +
    size +
    "</u></i></h2> <br><br>"
);

var closed = new Array(size * size);
var imgQueen = new Image(60, 60);
var imgEmpty = new Image(60, 60);
var imgDot = new Image(60, 60);
var win = new Audio("sound/win.mp3");
var click = new Audio("sound/click.mp3");
var id = 0;
var count = 0;
imgQueen.src = "img/crown-solid.svg";
imgEmpty.src = "img/square-regular.svg";
imgDot.src = "img/circle-dot-regular.svg";

// Grid Creation of N x N size

for (var r = 0; r < size; r++) {
  document.write("<tr>");
  for (var c = 0; c < size; c++) {
    id = r * size + c;
    document.write("<td id=" + id + ' onclick="placeq(this);">');
    document.write(
      '<img height="60" width="60" src="img/square-regular.svg"></td>'
    );
  }
  document.write("</tr>");
}

// Placing Queen at Specific Position

function placeq(cell) {
  var q = eval(cell.id);
  var r = Math.floor(q / size);
  var c = q % size;
  var min = Math.min(r, c);
  var max = Math.max(r, c);
  if (document.images[q].src == imgEmpty.src && safe(q)) {
    count++;
    click.play();
    // Checking Horizontally
    for (var h = r * size; h < r * size + size; h++) {
      closed[h] = h;
      document.images[h].src = imgDot.src; // Insert Dot
    }

    // Checking Vertically
    for (var v = c; v < size * size; v = v + size) {
      closed[v] = v;
      document.images[v].src = imgDot.src; // Insert Dot
    }

    // Checking Diagonally for any Queen on one way

    if (c > r) {
      var x1 = c - r;
      var x2 = q + (size + 1) * (size - c);
    } else {
      var x1 = (r - c) * size;
      var x2 = q + (size + 1) * (size - r);
    }
    for (var x = x1; x < x2; x = x + size + 1) {
      closed[x] = x;
      document.images[x].src = imgDot.src; // Insert Dot
    }

    // Checking Diagonally for any Queen on second way

    if (r + c > size - 1) {
      var y1 = q - (size - 1 - c) * (size - 1);
      var y2 = q + (size - 1) * (size - r);
    } else {
      var y1 = r + c;
      var y2 = q + size * c;
    }
    for (var y = y1; y < y2; y = y + (size - 1)) {
      closed[y] = y;
      document.images[y].src = imgDot.src; // Insert Dot
    }
    document.images[q].src = imgQueen.src; // Insert Queen
  }
  // Count Queens

  if (count == size) {
    alert("Congratulations.... ^_^ !! You WON !");
    win.play();
  }
  if (count > size) {
    alert("Too Many Queens");
  }
}

// Checking Unoccupied Position [Used for the only solution in Help button]

function safe(a) {
  if (closed[a] == a) {
    return false;
  } else {
    return true;
  }
}

// Checking the Safe Position for Queen (Unoccupied) [Used for the only solution in Help button]

var isSafe = function (prob, row, col) {
  // Check this row on left side

  for (var i = 0; i < col; i++) if (prob[row][i]) return false;

  // Check upper diagonal on left side

  for (var i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (prob[i][j]) return false;

  // Check lower diagonal on left side

  for (var i = row, j = col; i < size && j >= 0; i++, j--)
    if (prob[i][j]) return false;
  return true;
};

// To find whether queen can be placed or not [for Help function]

var solver = function (prob, col) {
  if (col >= size) return true;
  for (var i = 0; i < size; i++) {
    if (isSafe(prob, i, col)) {
      prob[i][col] = 1;
      if (solver(prob, col + 1)) return true;
      prob[i][col] = 0;
    }
  }
  return false;
};

// Displaying the queens placed on correct position

function help() {
  var prob = new Array(size);
  for (var i = 0; i < size; i++) {
    prob[i] = new Array(size).fill(0);
  }
  if (solver(prob, 0) == false) {
    alert("No Solutions exists for the given grid");
    return;
  }
  var b = new Array(size);
  for (var i = 0; i < size; i++)
    for (var j = 0; j < size; j++) if (prob[i][j] == 1) b[i] = i * size + j;
  clearBoard(); // Clearing Board
  for (var d = 0; d < size; d++) {
    window.document.images[b[d]].src = imgQueen.src;
  }
  count = size;
  for (var e = 0; e < size * size; e++) {
    closed[e] = e;
  }
}

// Clear Grid function

function clearBoard() {
  for (var a = 0; a < size * size; a++) {
    window.document.images[a].src = imgEmpty.src;
  }
  count = 0;
  closed = new Array(size);
}

// Info Button Toggle (Display and Hide)

function displayInfo() {
  var disp = document.getElementById("inf");
  if (disp.style.display === "none") {
    disp.style.display = "block";
  } else {
    disp.style.display = "none";
  }
}
