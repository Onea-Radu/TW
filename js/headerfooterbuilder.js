
  console.log('duh')
  $(function() {
  $(`<header>         
  <h1>Inteligența artificială</h1>
      <nav>
          <ul class="menu">

              <li><a href="index.html#intro">Introducere</a>
                  
                      <ul class="submenu">
                          <li><a href="index.html#SVM">SVM</a></li>
                          <li><a href="index.html#Retele">Retele</a></li>
                      </ul>
                  
              </li>

              <li ><a href="index.html#advanced">Avansat</a>
                 
                      <ul class="submenu">
                          <li><a href="index.html#DR">Învățarea prin consolidare</a></li>
                          <li><a href="joc.html">Joc demonstrativ</a></li>
                      </ul>
                  
              </li>
              <li ><a href="gallery.html">Galerie</a>
                  
                  
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
