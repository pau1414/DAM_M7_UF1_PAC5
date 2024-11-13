fetch('https://raw.githubusercontent.com/pau1414/DAM_M7_UF1_PAC5/refs/heads/main/carta.xml')
  .then(response => response.text())
  .then(data => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      cargarCarta(xmlDoc);
  })
  .catch(error => console.error('Error al cargar el XML:', error));

  function cargarCarta(xml) {
    const cartaDiv = document.querySelector('.carta'); // Selecciona el contenedor principal de la carta
    const grupos = xml.getElementsByTagName("GRUP"); // Obtiene todos los grupos de platos

    Array.from(grupos).forEach(grupo => {
        // Crea un nuevo div para el grupo
        const grupoDiv = document.createElement('div');
        grupoDiv.classList.add('GRUP');

        // Extrae y asigna el nombre del grupo
        const nombreGrupo = grupo.getElementsByTagName("NOM")[0].textContent;
        const nombreGrupoElemento = document.createElement('h2');
        nombreGrupoElemento.classList.add('NOM');
        nombreGrupoElemento.textContent = nombreGrupo;
        grupoDiv.appendChild(nombreGrupoElemento);

        // Itera sobre cada plato dentro del grupo
        const platos = grupo.getElementsByTagName("PLAT");
        Array.from(platos).forEach(plato => {
            const platDiv = document.createElement('div');
            platDiv.classList.add('PLAT');

            // Extrae y asigna el nombre del plato
            const nombrePlato = plato.getElementsByTagName("NOM")[0].textContent;
            const nombrePlatoElemento = document.createElement('span');
            nombrePlatoElemento.classList.add('NOM');
            nombrePlatoElemento.textContent = nombrePlato;
            platDiv.appendChild(nombrePlatoElemento);

            // Extrae y asigna la descripción del plato
            const descripcion = plato.getElementsByTagName("DESCRIPCIO")[0].textContent;
            const descripcionElemento = document.createElement('p');
            descripcionElemento.classList.add('DESCRIPCIO');
            descripcionElemento.textContent = descripcion;
            platDiv.appendChild(descripcionElemento);

            // Extrae y asigna el precio del plato
            const precio = plato.getElementsByTagName("PREU")[0].textContent;
            const precioElemento = document.createElement('span');
            precioElemento.classList.add('PREU');
            precioElemento.textContent = `${precio}€`;
            platDiv.appendChild(precioElemento);

            // Añade el div del plato al grupo
            grupoDiv.appendChild(platDiv);
        });

        // Añade el grupo a la carta
        cartaDiv.appendChild(grupoDiv);
    });
}