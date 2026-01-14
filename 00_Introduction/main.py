# main.py の中身
from pyscript import display, document, window
print("Python logic is now active!")

# 1. 検索ロジック（ここは今のまま。いずれ改修していく）
def search_tag(tag_name):
    tags = {
        "aside": "補足情報。広告やサイドバーに使う。",
        "main": "主要コンテンツ。1ページに1つ。",
        "section": "テーマごとのまとまり。見出しを伴うのがお作法。",
        "nav": "主要なナビゲーション。メニューなどに使う。"
    }
    # .lower() をつけると、大文字で打たれても検索できるようになる
    return tags.get(tag_name.lower(), f"「{tag_name}」はまだ未登録だぜ！")

# 2. ボタンが押された時に動く「司令塔」
def handle_search(event):
    # HTMLの入力欄（id="tag-input"）から文字を取得
    user_input = document.querySelector("#tag-input").value
    
    # 検索ロジックを呼び出す
    result = search_tag(user_input)
    
    # HTMLの結果表示場所（id="search-result"）にパッと出す！
    display(result, target="search-result", append=False)

# 3. ★超重要：ブラウザの「窓口」に関数を登録する
# これがないと、HTMLの py-click="handle_search" が動かない
window.handle_search = handle_search