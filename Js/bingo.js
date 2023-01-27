let count = 30;
let statusBingo = 0;
let CheckS = 0;
document.getElementById("_checkbox").addEventListener("change", function () {
  if (this.checked) {
    CheckS = 0;
    loop();
  } else {
    CheckS = 1;
    clearInterval(TimeBingo);
  }
});
function loop() {
  let TimeBingo = setInterval(() => {
    if (CheckS == 0) {
      if (statusBingo == 0) {
        random();

        document.getElementById("TimeBingo").innerHTML = count;

        console.log(count);
      } else {
        clearInterval(TimeBingo);
      }
    } else {
      clearInterval(TimeBingo);
    }
  }, 600);
}

function random() {
  if (statusBingo == 0) {
    const randomNumber = Math.floor(Math.random() * 74) + 1;

    let prevRand = 0;
    const rand = (max = 10) => {
      time = new Date().getTime();
      randid = (time / randomNumber / (prevRand + 1)) % max;

      prevRand = randid;

      return parseInt(randid);
    };

    let numRan = rand(75);
    let numberR = "";
    if (numRan == 0) {
      numberR = 1;
    } else {
      numberR = numRan;
    }
    setTimeout(function () {
      document.getElementById("number").classList.add("fade-out");
      setTimeout(function () {
        document.getElementById("number").innerHTML = numberR;
        document.querySelector(".my-label-D").style.transform = "scale(2, 2)";

        setTimeout(function () {
          document.querySelector(".my-label-D").style.transform = "scale(1, 1)";
        }, 270);
        document.getElementById("number").classList.remove("fade-out");
      }, 100);
    }, 100);

    updateTable(numberR);

    count--;
    if (count <= 0) {
      count = 0;
      if (count === 0) {
        clearInterval(TimeBingo);
        statusBingo = 1;
      }
    }
    document.getElementById("TimeBingo").innerHTML = count;

    var CompletedLines = checkForCompletedLines(numberR);

    if (CompletedLines[0] >= 1) {
      statusBingo = 1;
      console.log("Row  Bingo! You won!");
    } else if (CompletedLines[1] >= 1) {
      statusBingo = 1;

      console.log("Colum  Bingo! You won!");
    }
  } else {
    console.log("มีคน Bingo แล้ว");
  }
}

let rowArrays = {};
let colArrays = {};
let rowData = [];
function updateTable(randomNum) {
  let s = [];

  var table = document.getElementById("tableBingo");

  for (var i = 0, row; (row = table.rows[i]); i++) {
    for (var j = 0, col; (col = row.cells[j]); j++) {
      var idNum = document.getElementById("number_" + "1-" + randomNum);
      if (col.textContent == randomNum) {
        col.innerHTML = `<img class="my-img-star" src="/img/—Pngtree—pink unicorn horn clip art_5902854 (1).png" alt="${randomNum}">`;
        idNum.classList.remove("my-bg_num");
        idNum.classList.add("my-bingo");

        if (!rowArrays[i]) {
          rowArrays[i] = [randomNum];
        } else if (!rowArrays[i].includes(randomNum)) {
          rowArrays[i].push(randomNum);
        }

        if (!colArrays[j]) {
          colArrays[j] = [randomNum];
        } else if (!colArrays[j].includes(randomNum)) {
          colArrays[j].push(randomNum);
        }
      }
    }
  }
  console.log("Row");
  console.log(rowArrays);

  console.log("col");
  console.log(colArrays);
}

function checkForCompletedLines(numberR) {
  var rowCompletedLines = 0;
  var rowB = 0;
  var colCompletedLines = 0;
  var colB = 0;

  var table = document.getElementById("tableBingo");

  // check rows
  for (var i = 0, row; (row = table.rows[i]); i++) {
    var completed = true;
    for (var j = 0, col; (col = row.cells[j]); j++) {
      if (col.classList[2] !== "bingo") {
        completed = false;
        rowB = i;
        break;
      }
    }

    if (completed) {
      Rc = "R";

      checkBingo(i, Rc);
    }
  }

  // check columns
  for (var i = 0; i < 5; i++) {
    var completed = true;
    for (var j = 0, row; (row = table.rows[j]); j++) {
      var col = row.cells[i];
      if (col.classList[2] !== "bingo") {
        completed = false;
        colB = j;
        break;
      }
    }
    if (completed) {
      Rc = "C";

      checkBingo(i, Rc);
    }
  }

  function checkBingo(RowCol, Rc) {
    if (Rc == "R") {
      if (rowArrays[RowCol].length == 5) {
        let Bingo = "Bingo Rowที่: " + RowCol + "เลข: " + rowArrays[RowCol];
        console.log(Bingo);
        rowCompletedLines++;
      } else {
        console.log("มีบางอย่างผิดพลาด");
      }
    } else {
      if (colArrays[RowCol].length == 5) {
        let Bingo = "Bingo Colที่: " + RowCol + "เลข: " + colArrays[RowCol];
        console.log(Bingo);
        colCompletedLines++;
      } else {
        console.log("มีบางอย่างผิดพลาด");
      }
    }
  }

  let CompletedLines = [rowCompletedLines, colCompletedLines];

  return CompletedLines;
}
