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

  const urlBusca =
  `${GEO_URL}?name=${encodeURIComponent(cidade)}` +
  `&count=1&language=pt&format=json`;

fetch(urlBusca)
  .then(resposta => resposta.json())
  .then(dadosCidade => {
    const { latitude, longitude } = dadosCidade.results[0];
    
    const urlClima =
      `${CLIMA_URL}?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m` +
      `,wind_speed_10m,weather_code`;
      return fetch(urlClima);
  })
  .then(resposta => resposta.json())
  .then(dadosClima => {
    console.log(dadosClima);
  
  });

  fetch(urlBusca)
  .then(resposta => {
    // Verifica se o servidor respondeu com sucesso
    if (!resposta.ok) {
      throw new Error("Não foi possível consultar a cidade.");
    }

    // Converte o corpo da resposta para JSON
    return resposta.json();
  })
  .then(dados => {

    const resultado = document.getElementById("resultado");
    const temperatura = dados.temperatura;
    const umidade = dados.umidade;
    const vento = dados.vento;

resultado.innerHTML = `
  <div class="card-clima">
    <h2>${cidade}</h2>

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

    // Por enquanto, apenas observe o JSON
    console.log(dados); 
    

  })
  .catch(erro => {

    console.log(erro);
    resultado.innerHTML = `
        <p>
          Não foi possível consultar 
                    o clima dessa cidade.
        </p>
      `;


  });

  


}


