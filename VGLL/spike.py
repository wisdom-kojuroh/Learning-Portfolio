import easyocr
import logging

# ログ設定：開発の様子を可視化する
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def run_ocr(image_path: str, languages: list = ['en', 'ja']):
    logging.info(f"Initializing EasyOCR with languages: {languages}")
    
    # readerの初期化（初回のみモデルダウンロードが発生する）
    reader = easyocr.Reader(languages)
    
    logging.info(f"Starting OCR for: {image_path}")
    
    # OCR実行
    # detail=1にすることで、テキストだけでなく座標や精度も取得できる
    results = reader.readtext(image_path, detail=1)
    
    for (bbox, text, prob) in results:
        # bbox: 座標, text: 認識文字列, prob: 認識精度
        logging.info(f"Detected: {text} | Confidence: {prob:.2f}")

if __name__ == "__main__":
    # テスト画像へのパス
    test_image = "sample_game_screenshot.png"
    run_ocr(test_image)