// --- UI・コンポーネントモジュール ---
const UIComponents = {
  // 音声読み上げを実行する
  speak(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("お使いのブラウザは音声読み上げに対応していないみたい。");
    }
  },

  // タグごとの絞り込みボタンを動的に生成する
  renderTagButtons(containerEl, cards, onTagSelect) {
    containerEl.innerHTML = "";
    const tags = [...new Set(cards.map(c => c.tag || "未分類"))];
    tags.forEach(tag => {
      const btn = document.createElement("button");
      btn.textContent = tag;
      btn.style.cssText = "padding:4px 6px;font-size:10px;cursor:pointer;background:#f1f1f1;border:1px solid #ccc;border-radius:3px;white-space:nowrap;flex-shrink:0;";
      btn.addEventListener("click", () => onTagSelect(tag));
      containerEl.appendChild(btn);
    });
  }
};