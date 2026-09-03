// js/storage.js
const STORAGE_KEY = "my_flashcards_data";
let flashcards = [];

function normalizeCard(c) {
  return {
    id: typeof c.id === 'number' ? c.id : Date.now() + Math.random(),
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
  
  // デフォルトデータ
  flashcards = [
    {id:1,question:"Are there any others?",answer:"他に無いよな",tag:"日常会話",note:"相手に確認するときの定番フレーズ",stage:0,nextReview:null,isMastered:false},
    {id:2,question:"That's all, right?",answer:"これで全部だよね（他にないよね）",tag:"日常会話",note:"直訳は「それが全てだね」",stage:0,nextReview:null,isMastered:false},
    {id:3,question:"Any other options?",answer:"他に選択肢はないよな？",tag:"ビジネス",note:"ビジネスの交渉や提案の場面で使える",stage:0,nextReview:null,isMastered:false},
    {id:4,question:"Good morning!",answer:"おはよう！",tag:"朝の会話",note:"基本的な挨拶",stage:0,nextReview:null,isMastered:false}
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