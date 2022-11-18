/*AGENTES*/

const apiAgentes = "https://valorant-api.com/v1/agents?";
const contenedorAgentes = document.getElementById("contenedorAgentes");

fetch(
  apiAgentes +
    new URLSearchParams({
      language: "es-ES",
      isPlayableCharacter: true,
    })
)
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    console.log(datos.data);
    mostrarAgentes(datos.data);
  })
  .catch((error) => console.log(error));

function mostrarAgentes(datos) {
  datos.forEach((agente) => {
    let z = document.createElement("h2");
    z.innerHTML = agente.displayName;
    contenedorAgentes.appendChild(z);
    let x = document.createElement("p");
    x.innerHTML = agente.description;
    contenedorAgentes.appendChild(x);
  });
}
