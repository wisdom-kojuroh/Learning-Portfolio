// js/ui.js
const qEl = document.getElementById("card-question"),
      aEl = document.getElementById("card-answer"),
      noteEl = document.getElementById("card-note"),
      tagEl = document.getElementById("card-tag"),
      counterEl = document.getElementById("card-counter"),
      tBtn = document.getElementById("toggle-btn"),
      speakBtn = document.getElementById("speak-btn"),
      editBtn = document.getElementById("edit-btn"),
      deleteBtn = document.getElementById("delete-btn"),
      nBtn = document.getElementById("next-btn"),
      rBtns = document.getElementById("review-buttons"),
      masteredActionContainer = document.getElementById("mastered-action-container"),
      masterBtn = document.getElementById("master-btn"),
      unmasterBtn = document.getElementById("unmaster-btn"),
      editFormContainer = document.getElementById("edit-form-container"),
      editQInput = document.getElementById("edit-q"),
      editAInput = document.getElementById("edit-a"),
      editTInput = document.getElementById("edit-t"),
      editNoteInput = document.getElementById("edit-note"),
      saveEditBtn = document.getElementById("save-edit-btn"),
      cancelEditBtn = document.getElementById("cancel-edit-btn"),
      tagFilterContainer = document.getElementById("tag-filter-container"),
      reviewModeBtn = document.getElementById("review-mode-btn"),
      allModeBtn = document.getElementById("all-mode-btn"),
      shuffleModeBtn = document.getElementById("shuffle-mode-btn"),
      masteredModeBtn = document.getElementById("mastered-mode-btn"),
      newQInput = document.getElementById("new-q"),
      newAInput = document.getElementById("new-a"),
      newTInput = document.getElementById("new-t"),
      newNoteInput = document.getElementById("new-note"),
      addBtn = document.getElementById("add-btn"),
      exportBtn = document.getElementById("export-btn"),
      importFile = document.getElementById("import-file"),
      importCsvFile = document.getElementById("import-csv-file");

function renderTagButtons() {
  tagFilterContainer.innerHTML = "";
  const tags = [...new Set(getValidCards().map(c => c.tag || "未分類"))];
  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.style.cssText = "padding:4px 6px;font-size:10px;cursor:pointer;background:#f1f1f1;border:1px solid #ccc;border-radius:3px;white-space:nowrap;flex-shrink:0;";
    btn.addEventListener("click", () => {
      currentMode = "tag";
      activeCards = getValidCards().filter(c => (c.tag || "未分類") === tag);
      currentIndex = 0;
      showCard();
    });
    tagFilterContainer.appendChild(btn);
  });
}

function showCard() {
  editFormContainer.style.display = "none";
  if (activeCards.length === 0) {
    qEl.textContent = currentMode === "mastered" ? "習得済みのカードはありません" : "該当するカードはありません！";
    aEl.textContent = "";
    noteEl.style.display = "none";
    tagEl.style.display = "none";
    counterEl.textContent = "0 / 0";
    tBtn.style.display = "none";
    speakBtn.style.display = "none";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    rBtns.style.display = "none";
    masteredActionContainer.style.display = "none";
    nBtn.style.display = "none";
    return;
  }
  if (currentIndex >= activeCards.length) {
    qEl.textContent = "🎉 ここまでです！お疲れ様！";
    aEl.textContent = "";
    noteEl.style.display = "none";
    tagEl.style.display = "none";
    counterEl.textContent = `${activeCards.length} / ${activeCards.length}`;
    tBtn.style.display = "none";
    speakBtn.style.display = "none";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    rBtns.style.display = "none";
    masteredActionContainer.style.display = "none";
    nBtn.style.display = "none";
    return;
  }
  tagEl.style.display = "inline-block";
  const c = activeCards[currentIndex];
  qEl.textContent = c.question;
  aEl.textContent = c.answer;
  if (c.note) {
    noteEl.textContent = `📝 備考: ${c.note}`;
    noteEl.style.display = "block";
  } else {
    noteEl.style.display = "none";
  }
  tagEl.textContent = `🏷️ ${c.tag || "未分類"}`;
  counterEl.textContent = `${currentIndex + 1} / ${activeCards.length}`;
  aEl.style.display = "none";
  tBtn.style.display = "inline-block";
  tBtn.textContent = "答えを見る";
  speakBtn.style.display = "inline-block";
  editBtn.style.display = "inline-block";
  deleteBtn.style.display = "inline-block";
  rBtns.style.display = "none";
  masteredActionContainer.style.display = "none";
  nBtn.style.display = "none";
}