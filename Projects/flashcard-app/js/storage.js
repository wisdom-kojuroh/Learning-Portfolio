// --- データ永続化モジュール ---
const StorageManager = {
  // データの読み込み
  load(storageKey, defaultData = []) {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("LocalStorage is not available, using default data.");
    }
    return defaultData;
  },

  // データの保存
  save(storageKey, data) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn("Failed to save data to LocalStorage.");
      return false;
    }
  }
};