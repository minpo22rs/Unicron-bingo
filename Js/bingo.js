let count = 30;
let statusBingo = 0;
let CheckS = 0;
let intervalTurbo = 1000;
countBingo();
function countBingo() {
  document.getElementById("TimeBingo").innerHTML = count;
}
document.getElementById("_checkbox").addEventListener("change", function () {
  if (this.checked) {
    icon_Autoimg.src = "/img/icon/automaticOn.png";

    CheckS = 0;
    loop();
  } else {
    icon_Autoimg.src = "/img/icon/automaticOff.png";

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
  }, intervalTurbo);
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
      document.getElementById("sharp_icon").classList.remove("Spin_icon");
      document.getElementById("sharp_icon").classList.add("speedSpin");

      setTimeout(function () {
        document.getElementById("number").innerHTML = numberR;
        setTimeout(function () {
          document.querySelector(".my-label-D").style.transform =
            "scale(2.3, 2.3)";
          setTimeout(function () {
            document.querySelector(".my-label-D").style.transform =
              "scale(1.1, 1.1)";
            document.getElementById("sharp_icon").classList.remove("speedSpin");
            document.getElementById("sharp_icon").classList.add("Spin_icon");
          }, 230);
        }, 5);
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

      var duration = 15 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9000,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 550);

      Swal.fire({
        icon: "success",
        title: "<h2 >ยินดีด้วย" + "คุณ: " + "&nbsp;&nbsp;Bingo!</h2>",
        width: 600,
        padding: "3em",
        color: "#716add",
        background:
          "#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)",
        backdrop: `rgba(0,0,123,0.4)`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          clearInterval(interval);
        }
      });
    } else if (CompletedLines[1] >= 1) {
      statusBingo = 1;
      console.log("Colum  Bingo! You won!");
      var duration = 15 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9000,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 550);

      Swal.fire({
        icon: "success",
        title: "<h2 >ยินดีด้วย" + "คุณ: " + "&nbsp;&nbsp;Bingo!</h2>",
        width: 600,
        padding: "3em",
        color: "#716add",
        background:
          "#fff url(https://sweetalert2.github.io/#examplesimages/trees.png)",
        backdrop: `rgba(0,0,123,0.4)`,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.value) {
          clearInterval(interval);
        }
      });
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
        col.innerHTML = `<img class="my-img-star" src="/img/icon/—Pngtree—pink unicorn horn clip art_5902854 (1).png" alt="${randomNum}">`;
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
      if (col.classList[2] !== "my-bingo") {
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
      if (col.classList[2] !== "my-bingo") {
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

let checkboxT = document.querySelector("#_checkbox_turbo");
let icon_Thunder = document.querySelector("#icon_Thunder");

checkboxT.addEventListener("change", function () {
  if (checkboxT.checked) {
    icon_Thunder.src = "/img/icon/thunderOn.png";
    intervalTurbo = 100;
  } else {
    icon_Thunder.src = "/img/icon/thunderOff.png";
    intervalTurbo = 1000;
  }
});

// setInterval(function () {
//   checkboxT.addEventListener("change", function () {
//     if (checkboxT.checked) {
//       icon_Thunder.src = "/img/icon/thunderOn.png";
//       clearInterval(TimeBingo);
//       intervalTurbo = 100;
//     } else {
//       icon_Thunder.src = "/img/icon/thunderOff.png";
//       clearInterval(TimeBingo);
//       intervalTurbo = 1000;
//     }
//   });
//   console.log(intervalTurbo);
// }, 100);

let TestBTn = document.getElementById("TestBTn");
let AddC = document.querySelector(".addcount");
let clearAppC = document.querySelector(".clearAppC");

AddC.style.bottom = "-300px";

TestBTn.addEventListener("click", function () {
  if (AddC.style.bottom === "0px") {
    AddC.style.bottom = "-300px";
  } else {
    AddC.style.bottom = "0px";
  }
});
clearAppC.addEventListener("click", function () {
  if (AddC.style.bottom === "0px") {
    AddC.style.bottom = "-300px";
  } else {
    AddC.style.bottom = "0px";
  }
});

let CardBingo_0 = document.querySelector(".cardBingo-0");
let CardBingo_1 = document.querySelector(".cardBingo-1");
let CardBingo_2 = document.querySelector(".cardBingo-2");
let CardBingo_3 = document.querySelector(".cardBingo-3");

let CardBingoAll = [CardBingo_0, CardBingo_1, CardBingo_2, CardBingo_3];

const urlParams = new URLSearchParams(window.location.search);
const activeIndex = urlParams.get("activeIndex");
console.log(activeIndex);
console.log(CardBingoAll);
CardBingoAll[activeIndex].classList.remove("off-Card");