const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const searchTrigger = document.getElementById("searchTrigger");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const toast = document.getElementById("toast");

menuBtn?.addEventListener("click", () => mainNav.classList.toggle("open"));

searchTrigger?.addEventListener("click", () => {
  searchModal.classList.add("open");
  searchModal.setAttribute("aria-hidden", "false");
  setTimeout(() => searchInput.focus(), 80);
});
closeSearch?.addEventListener("click", closeSearchModal);
searchModal?.addEventListener("click", e => {
  if (e.target === searchModal) closeSearchModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeSearchModal();
});

function closeSearchModal(){
  searchModal.classList.remove("open");
  searchModal.setAttribute("aria-hidden", "true");
}

const articles = [
  ["POLÍTICA","Congresso em foco: por que um projeto de lei pode mudar sua rotina?"],
  ["CIDADANIA","Voto consciente: 5 perguntas para fazer antes de escolher um candidato"],
  ["EDUCAÇÃO","Educação financeira: por que esse assunto importa antes do primeiro salário?"],
  ["SOCIEDADE","Eventos climáticos extremos: como as cidades estão se preparando?"],
  ["MUNDO","Como decisões internacionais podem afetar o Brasil?"],
  ["TRABALHO","As profissões que estão surgindo com as novas tecnologias"],
  ["CULTURA","Por que cultura também é assunto de política pública?"]
];

searchInput?.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) {
    searchResults.innerHTML = '<div class="result"><span>JJ</span>Digite um assunto para começar a busca.</div>';
    return;
  }
  const found = articles.filter(a => a.join(" ").toLowerCase().includes(term)).slice(0,5);
  searchResults.innerHTML = found.length
    ? found.map(a => `<div class="result"><span>${a[0]}</span>${a[1]}</div>`).join("")
    : '<div class="result"><span>JJ</span>Nenhum resultado encontrado. Tente outro termo.</div>';
});

document.querySelectorAll(".concept").forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.term;
    const definition = btn.dataset.definition;
    showToast(`${title}: ${definition}`);
  });
});

document.getElementById("quizBtn")?.addEventListener("click", () => {
  showToast("Em breve: um quiz rápido para testar seus conhecimentos sobre política.");
});

document.getElementById("liveBtn")?.addEventListener("click", () => {
  showToast("Modo ao vivo demonstrativo — aqui você poderá conectar uma transmissão real.");
});

document.getElementById("newsletterForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email");
  const msg = document.getElementById("formMessage");
  msg.textContent = `Pronto! ${email.value} foi cadastrado no JJ.`;
  email.value = "";
});

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");
    if (window.innerWidth <= 650) mainNav.classList.remove("open");
  });
});
