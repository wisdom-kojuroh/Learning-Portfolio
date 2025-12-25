import json

def load_flow_data(filename):
    # ファイルを開いてデータを読み込む
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

# 実行してみる
if __name__ == "__main__":
    flow = load_flow_data('test_flow.json')
    
    print("--- SeekPilot 処理開始 ---")
    for item in flow:
        print(f"ステップ{item['step']}: {item['from']} が {item['to']} に対して 【{item['action']}】 を行う")
      
