const STORAGE_KEY = "my_flashcards_data";
const defaultCards = [
  { id: 1, question: "Are there any others?", answer: "他に無いよな", tag: "日常会話", note: "相手に確認するときの定番フレーズ", stage: 0, nextReview: null, isMastered: false },
  { id: 2, question: "That's all, right?", answer: "これで全部だよね（他にないよね）", tag: "日常会話", note: "直訳は「それが全てだね」", stage: 0, nextReview: null, isMastered: false },
  { id: 3, question: "Any other options?", answer: "他に選択肢はないよな？", tag: "ビジネス", note: "ビジネスの交渉や提案の場面で使える", stage: 0, nextReview: null, isMastered: false },
  { id: 4, question: "Good morning!", answer: "おはよう！", tag: "朝の会話", note: "基本的な挨拶", stage: 0, nextReview: null, isMastered: false }
];

let flashcards = StorageManager.load(STORAGE_KEY, defaultCards);
if (!flashcards || flashcards.length === 0) {
  flashcards = defaultCards;
  StorageManager.save(STORAGE_KEY, flashcards);
}

let activeCards = [];
let currentIndex = 0;
let currentMode = "review";

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
      importFile = document.getElementById("import-file");

function reloadActiveCards() {
  if (currentMode === "review") {
    activeCards = CardFilter.getReview(flashcards);
  } else if (currentMode === "all") {
    activeCards = CardFilter.getValid(flashcards);
  } else if (currentMode === "shuffle") {
    activeCards = CardFilter.shuffle(CardFilter.getValid(flashcards));
  } else if (currentMode === "mastered") {
    activeCards = CardFilter.getMastered(flashcards);
  }
}

function updateTagUI() {
  UIComponents.renderTagButtons(tagFilterContainer, CardFilter.getValid(flashcards), (selectedTag) => {
    currentMode = "tag";
    activeCards = CardFilter.getValid(flashcards).filter(c => (c.tag || "未分類") === selectedTag);
    currentIndex = 0;
    showCard();
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

reviewModeBtn.addEventListener("click", () => {
  currentMode = "review";
  activeCards = CardFilter.getReview(flashcards);
  currentIndex = 0;
  showCard();
});

allModeBtn.addEventListener("click", () => {
  currentMode = "all";
  activeCards = CardFilter.getValid(flashcards);
  currentIndex = 0;
  showCard();
});

shuffleModeBtn.addEventListener("click", () => {
  currentMode = "shuffle";
  activeCards = CardFilter.shuffle(CardFilter.getValid(flashcards));
  currentIndex = 0;
  showCard();
});

masteredModeBtn.addEventListener("click", () => {
  currentMode = "mastered";
  activeCards = CardFilter.getMastered(flashcards);
  currentIndex = 0;
  showCard();
});

tBtn.addEventListener("click", () => {
  if (aEl.style.display === "none") {
    aEl.style.display = "block";
    tBtn.style.display = "none";
    if (currentMode === "mastered") {
      masteredActionContainer.style.display = "flex";
    } else {
      rBtns.style.display = "flex";
    }
  }
});

speakBtn.addEventListener("click", () => {
  const c = activeCards[currentIndex];
  UIComponents.speak(c.question);
});

editBtn.addEventListener("click", () => {
  const c = activeCards[currentIndex];
  editQInput.value = c.question;
  editAInput.value = c.answer;
  editTInput.value = c.tag || "";
  editNoteInput.value = c.note || "";
  editFormContainer.style.display = "block";
});

cancelEditBtn.addEventListener("click", () => {
  editFormContainer.style.display = "none";
});

saveEditBtn.addEventListener("click", () => {
  const c = activeCards[currentIndex];
  const qText = editQInput.value.trim();
  const aText = editAInput.value.trim();
  const tText = editTInput.value.trim() || "一般";
  const nText = editNoteInput.value.trim();
  if (!qText || !aText) {
    alert("英語と日本語の両方を入力してくれ！");
    return;
  }
  c.question = qText;
  c.answer = aText;
  c.tag = tText;
  c.note = nText;
  StorageManager.save(STORAGE_KEY, flashcards);
  editFormContainer.style.display = "none";
  updateTagUI();
  showCard();
  alert("カードを更新したよ！");
});

deleteBtn.addEventListener("click", () => {
  if (confirm("このカードを本当に削除してもいいかい？")) {
    const c = activeCards[currentIndex];
    flashcards = flashcards.filter(item => item.id !== c.id);
    StorageManager.save(STORAGE_KEY, flashcards);
    reloadActiveCards();
    updateTagUI();
    showCard();
  }
});

document.querySelectorAll(".rev-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const days = parseInt(e.target.getAttribute("data-days"));
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    const currentCard = activeCards[currentIndex];
    currentCard.stage += 1;
    currentCard.nextReview = nextDate.toISOString();
    StorageManager.save(STORAGE_KEY, flashcards);
    rBtns.style.display = "none";
    nBtn.style.display = "block";
  });
});

masterBtn.addEventListener("click", () => {
  const currentCard = activeCards[currentIndex];
  currentCard.isMastered = true;
  StorageManager.save(STORAGE_KEY, flashcards);
  rBtns.style.display = "none";
  nBtn.style.display = "block";
});

unmasterBtn.addEventListener("click", () => {
  const currentCard = activeCards[currentIndex];
  currentCard.isMastered = false;
  currentCard.stage = 0;
  currentCard.nextReview = null;
  StorageManager.save(STORAGE_KEY, flashcards);
  masteredActionContainer.style.display = "none";
  nBtn.style.display = "block";
});

nBtn.addEventListener("click", () => {
  currentIndex++;
  showCard();
});

addBtn.addEventListener("click", () => {
  const qText = newQInput.value.trim();
  const aText = newAInput.value.trim();
  const tText = newTInput.value.trim() || "一般";
  const nText = newNoteInput.value.trim();
  if (!qText || !aText) {
    alert("英語と日本語の両方を入力してくれ！");
    return;
  }
  const newCard = {
    id: Date.now(),
    question: qText,
    answer: aText,
    tag: tText,
    note: nText,
    stage: 0,
    nextReview: null,
    isMastered: false
  };
  flashcards.push(newCard);
  StorageManager.save(STORAGE_KEY, flashcards);
  newQInput.value = "";
  newAInput.value = "";
  newTInput.value = "";
  newNoteInput.value = "";
  reloadActiveCards();
  updateTagUI();
  alert("新しいカードを追加したよ！");
  showCard();
});

exportBtn.addEventListener("click", () => {
  IOManager.exportJSON(flashcards, "flashcards_backup.json");
});

importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  IOManager.importJSON(file, (imported) => {
    flashcards = imported;
    StorageManager.save(STORAGE_KEY, flashcards);
    reloadActiveCards();
    updateTagUI();
    showCard();
    alert("JSONデータを正常にインポートしたよ！");
  }, (errMsg) => {
    alert(errMsg);
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker failed:', err));
  });
}

activeCards = CardFilter.getReview(flashcards);
updateTagUI();
showCard();