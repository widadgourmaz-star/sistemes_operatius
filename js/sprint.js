/* Carrega contingut.md (a la mateixa carpeta que aquest index.html), el
   converteix a HTML amb marked.js i construeix automàticament la taula
   d'apartats de dalt de tot, amb els enllaços "Tornar a l'índex". */
(function () {
  var contenidor = document.getElementById('contingut-md');
  if (!contenidor) return;

  var cosTaula = document.querySelector('.taula-apartats tbody');

  fetch('contingut.md')
    .then(function (resposta) {
      if (!resposta.ok) throw new Error('no s\'ha trobat contingut.md');
      return resposta.text();
    })
    .then(function (markdown) {
      contenidor.innerHTML = marked.parse(markdown);
      construeixIndex();
    })
    .catch(function (error) {
      contenidor.innerHTML =
        '<p class="carregant">No s\'ha pogut carregar el contingut (' + error.message +
        '). Si has obert l\'arxiu fent doble clic, prova-ho des de la web publicada ' +
        'a GitHub Pages: el navegador bloqueja aquesta càrrega quan la pàgina s\'obre amb file://.</p>';
    });

  function construeixIndex() {
    var capcaleres = contenidor.querySelectorAll('h2');

    capcaleres.forEach(function (capcalera, i) {
      var id = 'apartat' + (i + 1);
      capcalera.id = id;

      if (cosTaula) {
        var fila = document.createElement('tr');
        fila.innerHTML =
          '<td>' + (i + 1) + '</td><td><a href="#' + id + '">' + capcalera.textContent + '</a></td>';
        cosTaula.appendChild(fila);
      }

      var tornar = document.createElement('p');
      tornar.className = 'tornar-index';
      tornar.innerHTML = '<a href="#index-apartats">↑ Tornar a l\'índex</a>';

      var seguent = capcaleres[i + 1];
      if (seguent) {
        seguent.parentNode.insertBefore(tornar, seguent);
      } else {
        contenidor.appendChild(tornar);
      }
    });
  }
})();
