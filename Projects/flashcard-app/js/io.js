// js/io.js
function parseCSV(text) {
  const lines = text.split(/\r\n|\n/);
  const result = [];
  if (lines.length === 0) return result;
  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const row = [];
    let inQuotes = false;
    let currentField = "";
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        if (inQuotes && line[j + 1] === '"') {
          currentField += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentField);
        currentField = "";
      } else {
        currentField += char;
      }
    }
    row.push(currentField);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = (row[idx] !== undefined) ? row[idx].trim().replace(/^["']|["']$/g, '') : "";
    });


    if (obj.question && obj.answer) {
      // 数値ではなく、storage.jsと形式を合わせた一意な文字列IDを生成する
      const cardId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'csv_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substr(2, 9);
      result.push({
        id: cardId,
        question: obj.question,
        answer: obj.answer,
        tag: obj.tag || "一般",
        note: obj.note || "",
        stage: 0,
        nextReview: null,
        isMastered: false
      });
    }
  }
  return result;
}