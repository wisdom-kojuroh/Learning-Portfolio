// js/app.js
let activeCards = [];
let currentIndex = 0;
let currentMode = "review";

function reloadActiveCards() {
  if (currentMode === "review") { activeCards = getReviewCards(); }
  else if (currentMode === "all") { activeCards = getValidCards(); }
  else if (currentMode === "shuffle") { activeCards = shuffleArray(getValidCards()); }
  else if (currentMode === "mastered") { activeCards = getMasteredCards(); }
}

reviewModeBtn.addEventListener("click", () => { currentMode = "review"; activeCards = getReviewCards(); currentIndex = 0; showCard(); });
allModeBtn.addEventListener("click", () => { currentMode = "all"; activeCards = getValidCards(); currentIndex = 0; showCard(); });
shuffleModeBtn.addEventListener("click", () => { currentMode = "shuffle"; activeCards = shuffleArray(getValidCards()); currentIndex = 0; showCard(); });
masteredModeBtn.addEventListener("click", () => { currentMode = "mastered"; activeCards = getMasteredCards(); currentIndex = 0; showCard(); });

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
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(c.question);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  } else {
    alert("お使いのブラウザは音声読み上げに対応していないみたい。");
  }
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
  saveFlashcards();
  editFormContainer.style.display = "none";
  renderTagButtons();
  showCard();
  alert("カードを更新したよ！");
});

deleteBtn.addEventListener("click", () => {
  if (confirm("このカードを本当に削除してもいいかい？")) {
    const c = activeCards[currentIndex];
    flashcards = flashcards.filter(item => item.id !== c.id);
    saveFlashcards();
    reloadActiveCards();
    renderTagButtons();
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
    saveFlashcards();
    rBtns.style.display = "none";
    nBtn.style.display = "block";
  });
});

masterBtn.addEventListener("click", () => {
  const currentCard = activeCards[currentIndex];
  currentCard.isMastered = true;
  saveFlashcards();
  rBtns.style.display = "none";
  nBtn.style.display = "block";
});

unmasterBtn.addEventListener("click", () => {
  const currentCard = activeCards[currentIndex];
  currentCard.isMastered = false;
  currentCard.stage = 0;
  currentCard.nextReview = null;
  saveFlashcards();
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
  saveFlashcards();
  newQInput.value = "";
  newAInput.value = "";
  newTInput.value = "";
  newNoteInput.value = "";
  reloadActiveCards();
  renderTagButtons();
  alert("新しいカードを追加したよ！");
  showCard();
});


exportBtn.addEventListener("click", async () => {
  try {
    const dataStr = JSON.stringify(flashcards, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const file = new File([blob], "flashcards_backup.json", { type: "application/json" });

    // iOSなどのシェア機能（Web Share API）が使える環境ならファイルを共有する
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: '暗記カードバックアップ',
        text: 'JSONバックアップデータです'
      });
    } else {
      // PCブラウザなどのフォールバック
      const url = URL.createObjectURL(blob);
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", url);
      dlAnchorElem.setAttribute("download", "flashcards_backup.json");
      document.body.appendChild(dlAnchorElem);
      dlAnchorElem.click();
      document.body.removeChild(dlAnchorElem);
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      alert("エクスポートエラー: " + err.message);
    }
  }
});

importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      const normalized = normalizeCardList(parsed);
      if (normalized) {
        flashcards = normalized;
        saveFlashcards();
        reloadActiveCards();
        renderTagButtons();
        showCard();
        alert("JSONデータを正常にインポートしたよ！");
      } else {
        alert("有効なカードデータが見つかりませんでした。");
      }
    } catch(err) {
      alert("ファイルの読み込みに失敗しました。");
    }
  };
  reader.readAsText(file);
});

importCsvFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const newCards = parseCSV(event.target.result);
      if (newCards.length > 0) {
        flashcards = flashcards.concat(newCards);
        saveFlashcards();
        reloadActiveCards();
        renderTagButtons();
        showCard();
        alert(`${newCards.length}件のカードをCSVから追加したよ！`);
      } else {
        alert("有効なカードデータが見つかりませんでした。ヘッダーに question, answer が含まれているか確認してね。");
      }
    } catch(err) {
      alert("CSVファイルの読み込みに失敗しました。");
    }
  };
  reader.readAsText(file);
});

activeCards = getReviewCards();
renderTagButtons();
showCard();