// --- ステート＆フィルター管理モジュール ---
const CardFilter = {
  // 未習得のカードを抽出
  getValid(cards) {
    return cards.filter(c => !c.isMastered);
  },

  // 習得済みのカードを抽出
  getMastered(cards) {
    return cards.filter(c => c.isMastered);
  },

  // 今日復習すべきカードを抽出
  getReview(cards) {
    const now = new Date();
    return this.getValid(cards).filter(c => {
      if (!c.nextReview) return true;
      return new Date(c.nextReview) <= now;
    });
  },

  // 配列をランダムにシャッフルする
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
};