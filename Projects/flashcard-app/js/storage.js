// js/storage.js
const STORAGE_KEY = "my_flashcards_data";
let flashcards = [];

function normalizeCard(c) {
  // 既存の数値IDや古い形式を文字列（UUIDまたは文字列化されたID）に安全に統一する
  let cardId;
  if (typeof c.id === 'string' && c.id.trim() !== "") {
    cardId = c.id;
  } else if (typeof c.id === 'number') {
    cardId = String(c.id);
  } else {
    // IDがない、または不正な場合は自動でUUIDを生成する
    cardId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  return {
    id: cardId,
    question: typeof c.question === 'string' ? c.question : "",
    answer: typeof c.answer === 'string' ? c.answer : "",
    tag: typeof c.tag === 'string' && c.tag.trim() !== "" ? c.tag : "一般",
    note: typeof c.note === 'string' ? c.note : "",
    stage: typeof c.stage === 'number' ? c.stage : 0,
    nextReview: typeof c.nextReview === 'string' || c.nextReview === null ? c.nextReview : null,
    isMastered: Boolean(c.isMastered)
  };
}

function normalizeCardList(data) {
  if (!Array.isArray(data)) return null;
  const normalized = data.map(normalizeCard).filter(c => c.question && c.answer);
  return normalized.length > 0 ? normalized : null;
}

function loadFlashcards() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const normalized = normalizeCardList(parsed);
      if (normalized) {
        flashcards = normalized;
        return;
      }
    }
  } catch(e) {
    console.error("Load error:", e);
  }
  
  // デフォルトデータも文字列のUUID（または一意な文字列ID）で統一する
  flashcards = [
    {id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'default_1', question:"Are there any others?", answer:"他に無いよな", tag:"日常会話", note:"相手に確認するときの定番フレーズ", stage:0, nextReview:null, isMastered:false},
    {id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'default_2', question:"That's all, right?", answer:"これで全部だよね（他にないよね）", tag:"日常会話", note:"直訳は「それが全てだね」", stage:0, nextReview:null, isMastered:false},
    {id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'default_3', question:"Any other options?", answer:"他に選択肢はないよな？", tag:"ビジネス", note:"ビジネスの交渉や提案の場面で使える", stage:0, nextReview:null, isMastered:false},
    {id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'default_4', question:"Good morning!", answer:"おはよう！", tag:"朝の会話", note:"基本的な挨拶", stage:0, nextReview:null, isMastered:false}
  ];
  saveFlashcards();
}

function saveFlashcards() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  } catch(e) {
    console.error("Save error:", e);
    alert("データの保存に失敗したみたい。ストレージの空き容量を確認してね。");
  }
}

loadFlashcards();