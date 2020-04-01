
  console.log('duh')
  $(function() {
  $(`<header>         
  <h1>Inteligența artificială</h1>
      <nav>
          <ul class="menu">

              <li><a href="#intro">Introducere</a>
                  
                      <ul class="submenu">
                          <li><a href="#SVM">SVM</a></li>
                          <li><a href="#Retele">Retele</a></li>
                      </ul>
                  
              </li>

              <li ><a href="#advanced">Avansat</a>
                 
                      <ul class="submenu">
                          <li><a href="#DR">Învățarea prin consolidare</a></li>
                          <li><a href="./joc.html">Joc demonstrativ</a></li>
                      </ul>
                  
              </li>
              <li ><a href="#advanced">Galerie</a>
                  
                  
              </li>
              

          </ul>

      </nav>
      </header>
`).insertBefore('main');

$(`
<footer>
        <a href="mailto:onearadu12@gmail.com">onearadu12@gmail.com</a>
    </footer>
`).insertAfter('main');


  });
