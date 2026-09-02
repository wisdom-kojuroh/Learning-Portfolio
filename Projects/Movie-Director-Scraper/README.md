# Movie-Director-Scraper 🎬
Wikipediaから特定の映画監督の作品リストを自動抽出し、CSV形式で保存するスクレイピングツール。

---

## 🚀 機能
- Wikipediaの監督ページから作品名と公開年を抽出
- 抽出したデータを `Data/` フォルダに自動保存（BOM付きUTF-8でExcel対応）
- フォルダ構成が整理されており、保守性が高い設計

---

## 🛠️ セットアップ
1. 仮想環境の作成
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .\.venv\Scripts\Activate.ps1

---

## ライブラリのインストール

Bash
pip install -r requirements.txt
📂 フォルダ構成
src/: メインソースコード
Data/: 抽出済みCSVの保存先
build-tools/: 実行ファイル化（PyInstaller）用設定

