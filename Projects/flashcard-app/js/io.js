// js/io.js のエクスポート部分の改修案
exportBtn.addEventListener('click', async () => {
    const data = localStorage.getItem('flashcards') || '[]';
    const blob = new Blob([data], { type: 'application/json' });
    const file = new File([blob], 'flashcards_backup.json', { type: 'application/json' });

    // iOSのスタンドアロンでも動きやすいWeb Share APIを優先的に試す
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'Flashcard Backup',
                text: 'フラッシュカードのバックアップデータです'
            });
            return;
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.log('Share failed, fallback to download link', err);
            } else {
                return; // ユーザーがキャンセルした場合は何もしない
            }
        }
    }

    // フォールバック：通常ブラウザ向け
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});