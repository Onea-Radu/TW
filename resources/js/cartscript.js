window.onload = function () {
  //creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
  var ajaxRequest = new XMLHttpRequest();
  task2();
  task3();
  footer();
  ajaxRequest.onreadystatechange = function () {
    //daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
    if (this.readyState == 4 && this.status == 200) {
      //in proprietatea responseText am contintul fiserului JSON
      var obJson = JSON.parse(this.responseText);
      afiseazaCart(obJson.produse);
    }
  };

  //deschid o conexiune cu o cerere de tip get catre server
  //json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
  ajaxRequest.open("GET", "/json/useri.json", true);
  //trimit catre server cererea
  ajaxRequest.send();

  function afiseazaCart(prod) {
    $(document).ready(function () {
      var cart = JSON.parse(localStorage.cart);
      console.log(cart);
      console.log(prod);
      var total = 0;
      for (var i in cart) {
        produs = prod.find((produs) => {
          return produs.id == i;
        });
        total += produs.price * cart[i];
        $("#cart").append(
          `<li>${
            "nume: " +
            produs.name +
            " pret " +
            produs.price +
            " de " +
            cart[i] +
            " ori."
          }</li>`
        );
      }
      console.log("hau");
      setInterval(() => {
        $(".total").html("Totalul este " + total);
      }, 1500);
      //
    });
  }
};

function SortRev() {
  tabel = document.getElementById("cart");
  var v = Array.prototype.slice.call(tabel.children);
  v.reverse();

  for (i of v) tabel.appendChild(i);
}
