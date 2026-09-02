import requests
from bs4 import BeautifulSoup
import re
import csv
import tkinter as tk
from tkinter import messagebox
import os

# ==========================================
# 1. 抽出ロジック（行またぎ対応版）
# ==========================================
def extract_priority_works(soup):
    results = []
    
    infobox = soup.find('table', class_='infobox')
    if infobox:
        rows = infobox.find_all('tr')
        for i, row in enumerate(rows):
            row_text = row.get_text(strip=True)
            
            # 1. まず「主な作品」という見出し行を見つける
            if '主な作品' in row_text or '主な監督作品' in row_text:
                # 2. その行自体、または「次の行」に作品名があるはず
                # 今の行と次の行を合体させてスキャンする
                target_text = row_text
                if i + 1 < len(rows):
                    target_text += rows[i+1].get_text(strip=True)
                
                titles = re.findall(r'『([^』]+)』', target_text)
                for title in titles:
                    if title.strip():
                        results.append([title.strip(), "主要作品"])
                
                if results: break # 見つかったら終了

    # (本文スキャン用のバックアップロジックはそのまま残しておくと安心だぜ)
    return results

# ==========================================
# 2. 司令塔（データの取得と保存を担当）
# ==========================================
def get_wikipedia_works_to_csv(keyword):
    url = f"https://ja.wikipedia.org/wiki/{keyword}"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    results = extract_priority_works(soup)

    if not results:
        raise Exception(f"{keyword} の作品リストは見つからなかったよ。")

    filename = f"{keyword}_works.csv"
# 1. 自分の場所（src/main.py）から見て、一つ上の階層にある「Data」フォルダへのパスを作る
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    save_dir = os.path.join(base_dir, "Data")
    
    # 2. もしDataフォルダがなかったら、ここで自動で作る
    os.makedirs(save_dir, exist_ok=True)

    # 3. 保存するファイル名と、Dataフォルダのパスをガッチリ合体させる
    file_path = os.path.join(save_dir, f"{keyword}_works.csv")

    # 4. 指定した「フルパス」でファイルを開く
    with open(file_path, "w", encoding="utf_8_sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["作品名", "公開年"])
        writer.writerows(results)
    
    return len(results)

# ==========================================
# 3. GUIイベント
# ==========================================
def start_action():
    name = entry.get().strip()
    if not name:
        messagebox.showwarning("注意", "名前を入力してね！")
        return

    try:
        count = get_wikipedia_works_to_csv(name)
        messagebox.showinfo("成功", f"{name} の抽出完了！\n{count}件を保存したよ！")
    except Exception as e:
        messagebox.showerror("エラー内容", f"エラー詳細: {type(e).__name__}\n{e}")

# ==========================================
# 4. GUI画面の構築と起動
# ==========================================
root = tk.Tk()
root.title("Wikipedia作品抽出ツール")
root.geometry("400x250")

label = tk.Label(root, text="調べたい監督名を入力してね", font=("MS Gothic", 12))
label.pack(pady=10)

entry = tk.Entry(root, width=30, font=("MS Gothic", 12))
entry.pack(pady=10)

button = tk.Button(root, text="リストを抽出する", command=start_action, 
                   bg="#4CAF50", fg="white", font=("MS Gothic", 10, "bold"))
button.pack(pady=20)

root.mainloop()