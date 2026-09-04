if ("serviceworker" in navigator) {
  window.addEventListener("load", () => {
  navigator.serviceworker

  .register("sw.js")
  .then(() => {
    console.log("service worker registrado com sucesso.");
  })
  .catch((erro) => {
  console.error("erro ao registrar o serviço worker:", erro);
  });
});
}

const botaoBuscar = document.getElementById("buscar");

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const CLIMA_URL = "https://api.open-meteo.com/v1/forecast";

botaoBuscar.addEventListener("click", buscar);

function buscar() {
  console.log("O botão foi clicado!");

  const campoCidade = document.getElementById("cidade");
  const cidade = campoCidade.value.trim();

  console.log("Cidade digitada:", cidade);

  if (cidade === "") {
    alert("Digite o nome de uma cidade.");
    return;
  }

  const resultado = document.getElementById("resultado");

  const urlBusca =
    `${GEO_URL}?name=${encodeURIComponent(cidade)}` +
    `&count=1&language=pt&format=json`;

  fetch(urlBusca)
    .then(resposta => {
      if (!resposta.ok) {
        throw new Error("Não foi possível consultar a cidade.");
      }

      return resposta.json();
    })

    .then(dadosCidade => {

      if (!dadosCidade.results || dadosCidade.results.length === 0) {
        throw new Error("Cidade não encontrada.");
      }

      const { latitude, longitude, name } = dadosCidade.results[0];

      const urlClima =
        `${CLIMA_URL}?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

      return fetch(urlClima)
        .then(resposta => resposta.json())
        .then(dadosClima => {

          console.log("Dados do clima:", dadosClima);

          const temperatura = dadosClima.current.temperature_2m;
          const umidade = dadosClima.current.relative_humidity_2m;
          const vento = dadosClima.current.wind_speed_10m;

          resultado.innerHTML = `
            <div class="card-clima">
              <h2>${name}</h2>

              <p>
                Temperatura:
                <strong>${temperatura} °C</strong>
              </p>

              <p>
                Umidade:
                <strong>${umidade}%</strong>
              </p>

              <p>
                Vento:
                <strong>${vento} km/h</strong>
              </p>
            </div>
          `;
        });
    })

    .catch(erro => {

      console.log(erro);

      resultado.innerHTML = `
        <p>
          Não foi possível consultar o clima dessa cidade.
        </p>
      `;
    });
}