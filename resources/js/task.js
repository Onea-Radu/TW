//task 1
var ide;
function AgeCalc() {
  ageCalc = document.getElementById("ageCalc").value.split("#");
  console.log(ageCalc);
  console.log(ageCalc.reverse().join("/"));
  const date1 = new Date(ageCalc.join("/"));

  clearInterval(ide);
  ide = setInterval(toLocale, 1000, date1);
}

function toLocale(d) {
  const date2 = new Date();
  d = new Date(date2 - d);
  d.setFullYear(d.getFullYear() - 1970);
  $("#task1").html(
    `Ani: ${d.getFullYear()} luni: ${d.getMonth() - 1} zile: ${
      d.getDate() - 1
    } ore: ${d.getHours()} minute: ${d.getMinutes()} secunde: ${d.getSeconds()}`
  );
}

if (
  window.location.href !== "http://localhost:8080/shop" &&
  window.location.href !== "http://localhost:8080/cart"
)
  window.onload = function () {
    task2();
    task3();
    footer();
  };

var t = [];

function task2() {
  tsk2 = document.getElementsByClassName("task2");
  var r = 0;
  for (i of tsk2) {
    t.push(i.innerHTML);
    t[r] = i.innerHTML.split(" ");
    t[r] = t[r].filter((c) => c !== "");
    console.log(t);
    i.innerHTML = "";
    showStrangely(r++, i, 0);

    console.log("ciupa");
  }
}

function showStrangely(r, i, y) {
  i.innerHTML += " " + t[r][y];
  if (y + 1 < t[r].length) setTimeout(showStrangely, 300, r, i, y + 1);
}

var s;
function task3() {
  title = document.getElementById("Title");

  s = title.innerHTML;
  title.innerHTML = "";
  showStrange(0);
}

function showStrange(i) {
  title = document.getElementById("Title");
  title.innerHTML = "";
  for (y = 0; y < s.length; y++)
    if (y < i || y > s.length - i) title.innerHTML += s[y];
    else title.innerHTML += " ";

  if ((i - 1) * 2 <= s.length) setTimeout(showStrange, 150, i + 1);
}
var id;
function myMove() {
  var elem = document.getElementById("animate");
  var pos = 0;
  let l = 100;
  if (!id) id = setInterval(frame, 5);
  function frame() {
    pos -= 0.01;
    elem.style.top = 200 + Math.sin(pos) * l + "px";
    elem.style.left = 200 + Math.cos(pos) * l + "px";
  }
}

var ids;
function footer() {
  setInterval(fram, 1000);
}

function fram() {
  var t = JSON.parse(localStorage.getItem(window.location.href));
  if (!t) t = 1;
  else t += 1;
  $("#task").html(`Ati stat pe pagina ${t} secunde`);
  localStorage.setItem(window.location.href, JSON.stringify(t));
}
