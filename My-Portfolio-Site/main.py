# main.py の中身
from pyscript import document, window

print("Filtering system is now active!")

def handle_search(event):
    # 入力された文字を取得して小文字・空白除去
    search_query = document.querySelector("#tag-input").value.strip().lower()
    
    # テーブルの全行（データ部分）を取得
    rows = document.querySelectorAll("tbody tr")
    
    for row in rows:
        # その行の中にあるタグ名（1番目のtd）を取得
        tag_td = row.querySelector("td")
        if tag_td:
            tag_name = tag_td.innerText.strip().lower().replace("<", "").replace(">", "")
            
            # 検索ワードが空なら全部表示、一致すれば表示、それ以外は隠す！
            if search_query == "" or search_query in tag_name:
                row.style.display = ""  # 元の表示に戻す
            else:
                row.style.display = "none" # 非表示にする

# 窓口に登録
window.handle_search = handle_search