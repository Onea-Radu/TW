console.log("heya");
let v;
let ON;
window.onload = function () {
  //creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
  var ajaxRequest = new XMLHttpRequest();

  ajaxRequest.onreadystatechange = function () {
    //daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
    if (this.readyState == 4 && this.status == 200) {
      //in proprietatea responseText am contintul fiserului JSON
      var obJson = JSON.parse(this.responseText);
      ON = obJson;
      footer();
      task2();
      task3();
      setInterval(search, 1000);
      afiseajaJsonTemplate(obJson);
    }
  };

  //deschid o conexiune cu o cerere de tip get catre server
  //json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
  ajaxRequest.open("GET", "/json/useri.json", true);
  //trimit catre server cererea
  ajaxRequest.send();

  function afiseajaJsonTemplate(obJson) {
    //in acets div voi afisa template-urile
    let container = document.getElementsByClassName("tbody")[0];
    //creem copie
    v = obJson.produse.slice();

    //in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
    let textTemplate = "";

    //parcurg vetorul de studenti din obJson
    for (let i = 0; i < v.length; i++) {
      textTemplate += ejs.render(
        '<div class="div-table-row" onclick="buy(<%=produs.id%>)">\
        <div class="div-table-col" align="center"><%=index%></div>\
        <div class="div-table-col"><%=produs.name%></div>\
        <div class="div-table-col"><%=produs.price%></div>\
        <div class="div-table-col"><%=produs.tags.join(" ")%></div>\
        </div>',
        { produs: v[i], index: i }
      );
    }

    //adaug textul cu afisarea studentilor in container
    if (container) container.innerHTML = textTemplate;
    else console.log("muje");
  }
};

function buy(i) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart) cart = {};
  if (cart[i]) cart[i]++;
  else cart[i] = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(localStorage);
  $(".toast-body").html("Thank you for buying " + v[i].name);
  $(".toast").toast({ delay: 1000 });
  $(".toast").toast("show");
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify({}));
  $(".toast-body").html("Cleared cart");
  $(".toast").toast({ delay: 1000 });
  $(".toast").toast("show");
}

function goCart() {
  window.location.href = "http://localhost:8080/cart";
}

function SortAfterPrice() {
  tabel = document.getElementsByClassName("tbody")[0];
  var v = Array.prototype.slice.call(tabel.children);
  v.sort((a, b) => {
    return (
      parseInt(a.children[2].innerHTML) - parseInt(b.children[2].innerHTML)
    );
  });

  for (i of v) tabel.appendChild(i);
}

function Reset() {
  location.reload();
}

function filterPrice() {
  tabel = document.getElementsByClassName("tbody")[0];
  var v = Array.prototype.slice.call(tabel.children);

  v = v.filter((a) => {
    console.log(a.children[2]);
    return parseInt(a.children[2].innerHTML) >= 20;
  });
  console.log(v);

  tabel.innerHTML = "";
  for (i of v) tabel.appendChild(i);
}

function filterWith(i) {
  tabel = document.getElementsByClassName("tbody")[0];
  var v = Array.prototype.slice.call(tabel.children);

  v = v.filter((a) => {
    for (o of ON.useri[i].materii.split(", ")) {
      console.log(o);
      let re = new RegExp(o.toLowerCase());
      if (re.exec(a.children[3].innerHTML.toLowerCase())) return true;
    }
    return false;
  });
  console.log(v);

  tabel.innerHTML = "";
  for (i of v) tabel.appendChild(i);
}

function search() {
  var inp = document.getElementById("search").value;
  tabel = document.getElementsByClassName("tbody")[0];
  var v = Array.prototype.slice.call(tabel.children);

  v = v.map((a) => {
    let re = new RegExp(inp.toLowerCase());
    if (re.exec(a.children[1].innerHTML.toLowerCase()) && inp !== "")
      a.style["background-color"] = "red";
    else a.style["background-color"] = "#ccc";
    return a;
  });
  console.log(v);

  tabel.innerHTML = "";
  for (i of v) tabel.appendChild(i);
}
