##Python 学習レッスン 繰り返し処理編目標物を確認しよう 1.目標物を確認しよう


money = 1000
items = {'apple': 100, 'banana': 200, 'orange': 400}
for item_name in items:
    print('--------------------------------------------------')
    print('財布には' + str(money) + '円入っています')
    print(item_name + 'は1個' + str(items[item_name]) + '円です')
    
    input_count = input('購入する' + item_name + 'の個数を入力してください：')
    print('購入する' + item_name + 'の個数は' + input_count + '個です')
    
    count = int(input_count)
    total_price = items[item_name] * count
    print('支払い金額は' + str(total_price) + '円です')
    
    if money >= total_price:
        print(item_name + 'を' + input_count + '個買いました')
        money -= total_price
        
        if money == 0:
            print('財布が空になりました')
            break
    else:
        print('お金が足りません')
        print(item_name + 'を買えませんでした')
print('残金は' + str(money) + '円です')


##Python 学習レッスン 繰り返し処理編複数のデータを扱おう 2.リスト


# 変数 fruits に、複数の文字列を要素に持つリストを代入してください
fruits = ['apple', 'banana', 'orange' ]

# インデックス番号が 0 の要素を出力してください
print(fruits[0])

# インデックス番号が 2 の要素を文字列と連結して出力してください
print('好きな果物は' + fruits[2] + 'です' )


## Python 学習レッスン 繰り返し処理編複数のデータを扱おう 3.リストの要素の更新・追加


fruits = ['apple', 'banana', 'orange']

# リストの末尾に文字列「 grape 」を追加してください
fruits.append('grape')

# 変数 fruits に代入したリストを出力してください
print(fruits)

# インデックス番号が 0 の要素を文字列「 cherry 」に更新してください
fruits[0] = 'cherry'

# インデックス番号が 0 の要素を出力してください
print(fruits[0])


##Python 学習レッスン 繰り返し処理編複数のデータを扱おう 4.for文


# fruits = ['apple', 'banana', 'orange']

# # for 文を用いてリストの要素を1つずつ取り出し、「 好きな果物は◯◯です 」と出力してください
# for fruit in fruits:
#     print("好きな果物は"+ fruits[0] + "です")
#     print("好きな果物は"+ fruits[1] + "です")
#     print("好きな果物は"+ fruits[2] + "です")
    
    
fruits = ['apple', 'banana', 'orange']

# for 文を用いてリストの要素を1つずつ取り出し、「 好きな果物は◯◯です 」と出力してください
for fruit in fruits:
    print("好きな果物は"+ fruit + "です")



##Python 学習レッスン 繰り返し処理編複数のデータを扱おう 5.辞書


# 変数 fruits に辞書を代入してください
fruits={'apple':'りんご','banana':'バナナ'}

# 辞書 fruits のキー「 banana 」に対応する値を出力してください
print(fruits['banana'])

# 辞書 fruits を用いて、「 appleは◯◯という意味です 」となるように出力してください
print("appleは" + fruits['apple'] + "という意味です")




Python 学習レッスン 繰り返し処理編複数のデータを扱おう 6.辞書の要素の更新・追加

fruits = {'apple': 100, 'banana': 200, 'orange': 400}

# キー「 banana 」の値を数値 300 に更新してください
fruits['banana']=300

# キーが「 grape 」、値が数値の 500 の要素を辞書 fruits に追加してください
fruits['grape']=500

# fruits の値を出力してください
print(fruits)

#間違い部分：
# fruits{'banana'}='300'
# 辞書の場合は{}だと思っていたが、角カッコ[]が正解。角かっこは
#**「添字演算子（subscript operator）」**っていう、
# 中身を取り出したり、入れたりするための共通の文法として使われている。
# 数値（数字）の更新だから'ではない。（'は文字扱いにするために使うもの）


##Python 学習レッスン 繰り返し処理編 複数のデータを扱おう　7.for文


fruits = {'apple': 'りんご', 'banana': 'バナナ', 'grape': 'ぶどう'}

# for 文を用いて、辞書のキーを1つずつ取り出し、繰り返しの中で「 ◯◯は△△という意味です 」と出力させてください
for fruit_key in fruits:
    print(fruit_key + "は" + fruits[fruit_key] + "という意味です")


##Python 学習レッスン 繰り返し処理編 いろいろな処理をしてみよう 8. while文


x = 10

# while 文を用いて、「変数 x が 0 より大きい」間、
# 繰り返される繰り返し処理を作ってください
while x > 0:
    # 変数 x を出力してください
    print(x)
    # 変数 x から 1 引いてください
    x -= 1

# 当然だが、最終行のインデントを忘れるとwhile文から外れて
# 永遠にtrueとなる無限ループに突入する場合から気を付けること。


##Python 学習レッスン 繰り返し処理編 いろいろな処理をしてみよう 9.break


numbers = [765, 921, 777, 256]
for number in numbers:
    print(number)
    # 変数 number が 777 のとき「 777が見つかったので処理を終了します 」と出力した後、処理を終了させてください
    if number == 777:
       print("777が見つかったので処理を終了します")
       break
 



# 文字列のキーと数値の値を持つ辞書を作って、変数 items に代入してください
items  = {"apple":100, "banana":200, "orange":400}

# for 文を用いて、辞書 items のキーを1つずつ取り出していく繰り返し処理を作成してください
for item_name in items:
    # 「 --------------------------------------------- 」を出力してください
    # print("---------------------------------------------"):
    ## 指定した記号を複数出力
    print("-" * 45)
    price = items[item_name]
    
    # 「 ◯◯は1個△△円です 」となるように出力してください
    
    print(item_name + 'は1個' + str(items[item_name]) + '円です')
    # f-stringsを使う場合の表現
    print(f"{item_name}の値段は{price}円です")
