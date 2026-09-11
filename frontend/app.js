const API_URL = "http://localhost/sistema-treinos/backend/treinos.php";

const lista = document.getElementById("lista");
const form = document.getElementById("form");
const modal = document.getElementById("modal");
const busca = document.getElementById("busca");

async function carregar(filtro = "") {
  const url = filtro ? `${API_URL}?busca=${encodeURIComponent(filtro)}` : API_URL;
  const resposta = await fetch(url);
  const treinos = await resposta.json();
  renderizar(treinos);
}

function renderizar(treinos) {
  lista.innerHTML = treinos.map(t => `
    <div class="card">
      <h3>${t.exercicio}</h3>
      <p>${t.grupo_muscular} — ${t.data_treino}</p>
      <p>${t.series}x${t.repeticoes} — ${t.carga_kg}kg</p>
      <p>${t.observacoes || ""}</p>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="excluir(${t.id})">Excluir</button>
    </div>
  `).join("");
}

document.getElementById("btnNovo").addEventListener("click", () => {
  form.reset();
  document.getElementById("treinoId").value = "";
  modal.classList.remove("oculto");
});

document.getElementById("btnCancelar").addEventListener("click", () => {
  modal.classList.add("oculto");
});

async function editar(id) {
  const resposta = await fetch(API_URL);
  const treinos = await resposta.json();
  const t = treinos.find(x => x.id === id);

  document.getElementById("treinoId").value = t.id;
  document.getElementById("exercicio").value = t.exercicio;
  document.getElementById("grupo").value = t.grupo_muscular;
  document.getElementById("data").value = t.data_treino;
  document.getElementById("series").value = t.series;
  document.getElementById("repeticoes").value = t.repeticoes;
  document.getElementById("carga").value = t.carga_kg;
  document.getElementById("observacoes").value = t.observacoes || "";

  modal.classList.remove("oculto");
}

async function excluir(id) {
  if (!confirm("Excluir este treino?")) return;
  await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
  carregar(busca.value);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("treinoId").value;

  const dados = {
    exercicio: document.getElementById("exercicio").value,
    grupo_muscular: document.getElementById("grupo").value,
    data_treino: document.getElementById("data").value,
    series: document.getElementById("series").value,
    repeticoes: document.getElementById("repeticoes").value,
    carga_kg: document.getElementById("carga").value || 0,
    observacoes: document.getElementById("observacoes").value,
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}?id=${id}` : API_URL;

  await fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  modal.classList.add("oculto");
  carregar(busca.value);
});

busca.addEventListener("input", () => carregar(busca.value));

carregar();