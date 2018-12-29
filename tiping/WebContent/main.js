/**
 * 
 */

//0~25までの乱数を格納する配列
var rand = new Array();
//の文字列を格納
var mondai = "";
//何問目か格納
var count = 0;
//問題数
var queNum = 9;
//現在のパネル
var current = "";

/*--------------------------------------------*/

//キー状態管理変数の定義
var KEYS = new Array(256);
//キーの状態を false （押されていない）で初期化
for(var i=0; i<KEYS.length; i++) {
    KEYS[i] = false;
}
//キーが押された時に呼び出される処理を指定
window.onkeydown = function(e) {
    //キーボードによる自動スクロールの防止
    e.preventDefault();
    //キーを押された状態に更新
    KEYS[e.keyCode] = true;
    typeGame();
    
};
//キーが離された時に呼び出される処理を指定
window.onkeyup = function(e) {
    //キーを離された状態に更新
    KEYS[e.keyCode] = false;
};
//キーコードを格納する配列
var kCode = new Array(65,66,67,68,69,70,71,72,73,
                        74,75,76,77,78,79,80,81,82,
                        83,84,85,86,87,88,89,90);
//文字を格納する配列
var Alphabet = new Array("Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ",
                         "Ｊ","Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ",
                         "Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ");

/*--------------------------------------------*/

//タイピングゲームの問題をセットする
function gameSet(){
  //問題文とカウント数をクリアする
  mondai = "";
  count = 0;
  //0～25までの乱数を queNum 個作成して配列randに格納する
  for (var i = 0;i < queNum ;i++){
    rand[i] = Math.floor( Math.random() * 26 );
  }
    
  //問題文の作成
//  for ( var i = 0 ; i < queNum ; i++){
//    mondai =  mondai + Alphabet[rand[i]];
//  }

  mondai = "<table id='qTable'>";
  
  for(var i = 0; i < 3; i++ ){
    mondai += "<tr>";
    for(var j = 0; j < 3; j++) {
      var idNum = i * 3 + j;
      mondai += "<td id='word"+idNum+"' class = 'panel'>"+Alphabet[rand[idNum]]+"</td>";
    }
    mondai += "</tr>";
  }
  mondai += "</table>";
    

  
  //問題枠に表示する
  document.getElementById("container").innerHTML = mondai;
}

//キー入力を受け取る
function typeGame(){
    current = "";
    //入力されたキーコードと、問題文のキーコードを比較
    if(KEYS[kCode[rand[count]]]){
        //カウント数を＋１にする
        count++;
    
        //全文字入力したか確認
        if (count < queNum){
            //問題文の頭の一文字を切り取る
            mondai = mondai.substring(1,mondai.Length);
            //問題枠に表示する
//            document.getElementById("container").innerHTML = mondai;
            //打鍵した文字を消す
            current = "word";
            current += count-1;
            document.getElementById(current).style.background = "#ff000000";
        }else{
            //問題枠にゲーム終了を表示
            document.getElementById("container").innerHTML = "終了します";
        }
    }
}

/*--------------------------------------------*/

gameSet();
