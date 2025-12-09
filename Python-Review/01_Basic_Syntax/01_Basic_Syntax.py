#### Python 基礎文法編



## 【1. 文字列】


# 「 Hello World 」と出力してください

print ('Hello World')


## 【2. 数値】


# 数値の 7 を出力して
print (7)
# 9 に 3 足した値を出力してください
print (9+3)

# 「9 + 3」を文字列として出力してください
print ('9 + 3')


print(20)
print(35 + 7)
print(35 - 23)
print(20 - 39)
print(20 / 5)
print(55 * 83)

#文字として出力させる場合はクォーテーションで囲む

print('20')
print('35 + 7')
print('35 - 23')
print('20 - 39')
print('20 / 5')
print('55 * 83')


## 【3. 計算してみよう】


# 9 を 2 で割った値を出力してください
print(9 / 2)

# 7 に 5 を掛けた値を出力してください
print(7*5)

# 5 を 2 で割った時の余りを出力してください
print(5 % 2)


## 【4. 変数】


# 変数 name に文字列「 にんじゃわんこ 」を代入してください
name='にんじゃわんこ'

# 変数 name の値を出力してください
print(name)

# 変数 number に数値の 7 を代入してください
number=7

# 変数 number の値を出力してください
print(number)


## 【5. 変数を使ってみよう】


apple_price = 200
apple_count = 8

# apple_price と apple_count を掛けた結果を、変数 total_price に代入してください
total_price = apple_price * apple_count

# total_price の値を出力してください
print(total_price)


# 家の面積の計算（変数使用）
length = 20
width = 15

area_length = length * width
print(area_length)

# 家の面積の計算（変数なし）

site_area = 20 * 15

print(site_area)


## 【6. 変数の値を更新してみよう】


money = 2000
print(money)

# 変数 money に 5000 を足して、変数 money を上書きしてください
money = money + 5000

# 変数 money の値を出力してください
print(money)


## 【7. 文字列の連結】


# my_name という変数に「 にんじゃわんこ 」という文字列を代入してください
my_name = 'にんじゃわんこ'

# my_name を用いて、「私はにんじゃわんこです」となるように変数と文字列を連結して出力してください
print('私は' + my_name + 'です')


## 【8. データ型】


age = 24
# age を用いて「私は24歳です」と出力してください
print('私は' + str(age) + '歳です')

count = '5'
# count に 1 を足した値を出力してください
print(int(count) + 1)


## 【9. if分】

x = 7 * 10
y = 5 * 6

# x が 70 と等しい場合に「 xは70です 」と出力してください
if x == 70:
 print('xは70です')

# y が 40 と等しくない場合に「 yは40ではありません 」と出力してください
if y != 40:
 print('yは40ではありません')


## 【10. 真偽値】


x = 10
# x が 30 より大きい場合に「 xは30より大きいです 」と出力してください

if x > 30:
  print( 'xは30より大きいです' )

money = 500
apple_price = 200
# money の値が apple_price の値以上の時、「 りんごを買うことができます 」と出力してください
if money >= apple_price:
  print( 'りんごを買うことができます' )


## 【11. else】


money = 100
apple_price = 200

if money >= apple_price:
    print('りんごを買うことができます')
# if 文の条件に当てはまらない場合に「 お金が足りません 」と出力してください
else:print('お金が足りません')

money = 1000
apple_price = 1500

if money >= apple_price:
    print('購入完了')
else:print('金が無いなら客やないわ！')


## 【12. elif】


money = 100
apple_price = 100

if money > apple_price:
    print('りんごを買うことができます')
# 変数の値が等しい場合に「 りんごを買うことができますが所持金が0になります 」と出力してください
elif money == apple_price:
    print('りんごを買うことができますが所持金が0になります')
else:
    print('お金が足りません')



## 【13. 条件式を組み合わせよう】


x = 20
# 変数 x が 10 以上 30 以下の場合に「 xは10以上30以下です 」と出力してください
if x >= 10 and x <= 30:
    print('xは10以上30以下です')

y = 60
# 変数 y が 10 未満または 30 より大きい場合に「 yは10未満または30より大きいです 」と出力してください
if y < 10 or y > 30:
    print('yは10未満または30より大きいです')

z = 55
# 変数 z が 77 ではない場合に「 zは77ではありません 」と出力してください
if not z == 77:
    print('zは77ではありません')


## 【14. 代金を計算しよう】


# apple_price という変数に数値 200 を代入してください
apple_price = 200

# count という変数に数値 5 を代入してください
count = 5

# total_price という変数に、 apple_price と count を掛けたものを代入してください
total_price = apple_price * count

# 「 購入するりんごの個数は○○個です 」となるように出力してください
print( '購入するりんごの個数は' + str(count) + '個です' )

# 「 支払い金額は○○円です 」となるように出力してください
print( '支払い金額は' + str(total_price) + '円です' )


## 【15. 入力を受け取ろう】


apple_price = 200

# input を用いて入力を受け取り、変数 input_count に代入してください
input_count = input('購入するりんごの個数を入力してください:')

# input_count を数値として代入してください
count = int(input_count)
total_price = apple_price * count

print('購入するりんごの個数は' + str(count) + '個です')
print('支払い金額は' + str(total_price) + '円です')


## 【16. 条件分岐をしよう】


apple_price = 200
# 変数 money に数値 1000 を代入してください
money = 1000

input_count = input('購入するりんごの個数を入力してください:')
count = int(input_count)
total_price = apple_price * count

print('購入するりんごの個数は' + str(count) + '個です')
print('支払い金額は' + str(total_price) + '円です')

# money と total_price の比較結果によって条件を分岐してください
# 購入できた場合
if total_price < money:
    print('りんごを' +str(count) + '個買いました')
    print('残金は' + str(money - total_price) + '円です')

# 1000円分を購入した場合
elif total_price == money:
    print('りんごを' +str(count) + '個買いました')
    print('財布が空になりました')

# お金が足りなかった場合
else:
    print('お金が足りません')
    print('りんごを買えませんでした')

