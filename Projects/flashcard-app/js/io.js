// js/io.js - データのエクスポート・インポート処理

document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('export-btn');
    const importFile = document.getElementById('import-file');

    // JSONエクスポート処理
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // ストレージから全データを取得（アプリの仕様に合わせてキー名を調整してね）
            const data = localStorage.getItem('flashcards') || '[]';
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'flashcards_backup.json';
            document.body.appendChild(a);
            a.click();
            
            // クリーンアップ
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // JSONインポート処理
    if (importFile) {
        importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    // JSONとしてパースできるかざっくりチェック
                    JSON.parse(content);
                    
                    // localStorageに保存
                    localStorage.setItem('flashcards', content);
                    alert('データのインポートが完了しました！ページを再読み込みします。');
                    location.reload();
                } catch (err) {
                    alert('無効なJSONファイルです。正しいファイルを指定してください。');
                }
            };
            reader.readAsText(file);
        });
    }
});