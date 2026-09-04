// js/io.js

function exportJSON(flashcards) {
  try {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flashcards, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "flashcards_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (e) {
    console.error("Export error:", e);
    alert("JSONのエクスポートに失敗したみたい。");
  }
}

function importJSON(file, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const parsed = JSON.parse(event.target.result);
      if (typeof normalizeCardList === 'function') {
        const normalized = normalizeCardList(parsed);
        if (normalized) {
          callback(null, normalized);
          return;
        }
      }
      callback(new Error("有効な暗記カードデータが見つからないよ。"));
    } catch (e) {
      console.error("Import error:", e);
      callback(e);
    }
  };
  reader.readAsText(file);
}