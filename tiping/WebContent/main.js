/**
 * 
 */

//0~25までの乱数を格納する配列
var rand = new Array();
//の文字列を格納
var mondai = "";
//何文字目か格納
var count = 0;
//パネルの数
var queNum = 15;
//問題数
var qCount = 3;
//何問目か格納
var qCurrent = 0;
//正解数
var correctCount = 0;
//不正解回数
var unCorrectCount = 0;

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


//回答ボタン用配列
//もっといい書き方があるはずだがうまくいかないのでとりあえずこれで。。。
var Question =　new Array();

var Question1 = {select1:'select1', select2:'select2', select3:'select3', right:'select1'};
var Question2 = {select1:'select1', select2:'select2', select3:'select3', right:'select2'};
var Question3 = {select1:'select1', select2:'select2', select3:'select3', right:'select3'};

Question.push(Question1); 
Question.push(Question2); 
Question.push(Question3); 

/*--------------------------------------------*/
//初期化関数
function initialize(){
  qCurrent = 0;
  correctCount = 0;
  //回答ボタン表示
  document.getElementById("answerButton1").style.visibility = "visible";
  document.getElementById("answerButton2").style.visibility = "visible";
  document.getElementById("answerButton3").style.visibility = "visible";  
  //Restartボタン表示
  document.getElementById("restart").style.visibility = "hidden";
  gameSet();
}

//タイピングゲームの問題をセットする
function gameSet(){
  //終了判定
  if(qCurrent == qCount){
    // document.getElementById("container").innerHTML = "終了します。正解数：" + correctCount;
    //回答ボタン非表示
    document.getElementById("answerButton1").style.visibility = "hidden";
    document.getElementById("answerButton2").style.visibility = "hidden";
    document.getElementById("answerButton3").style.visibility = "hidden";  
    //Restartボタン表示
    document.getElementById("restart").style.visibility = "visible";
    alert("終了します。正解数：" + correctCount); 
    initialize();
  }
  //問題文とカウント数をクリアする
  mondai = "";
  count = 0;
  qCurrent++;
  unCorrectCount = 0;
  //0～25までの乱数を queNum 個作成して配列randに格納する
  for (var i = 0;i < queNum ;i++){
    rand[i] = Math.floor( Math.random() * 26 );
  }

  //パネル作成
  mondai = "<table id='qTable'>";
  
  for(var i = 0; i < 3; i++ ){
    mondai += "<tr>";
    for(var j = 0; j < 5; j++) {
      var idNum = i * 5 + j;
      mondai += "<td id='word"+idNum+"' class = 'panel'>"+Alphabet[rand[idNum]]+"</td>";
    }
    mondai += "</tr>";
  }
  mondai += "</table>";
  
  //問題枠に表示する
  document.getElementById("container").innerHTML = mondai;

  //回答ボタンに表示する
  document.getElementById("answerButton1").value = Question[qCurrent-1].select1;
  document.getElementById("answerButton2").value = Question[qCurrent-1].select2;
  document.getElementById("answerButton3").value = Question[qCurrent-1].select3;  

  //打鍵対象の色を変える
  document.getElementById("word0").style.background = "#5bc0de";
}

//キー入力を受け取る
function typeGame() {
  //入力されたキーコードと、問題文のキーコードを比較
  if (KEYS[kCode[rand[count]]]) {
    //カウント数を＋１にする
    count++;
    mondai = mondai.substring(1, mondai.Length);
    //打鍵した文字を消す
    var current = "word" + (count - 1);
    var next = "word" + count;
    document.getElementById(current).style.background = "#ff000000";
    document.getElementById(next).style.background = "#5bc0de";
  }
}

//回答をチェック
function checkAnswer(){
  //押されたボタンを取得
  var selectedAnswer = event.target;
  //正解
  if(selectedAnswer.value == Question[qCurrent-1].right) {
//     alert("Correct!!");
    correctCount++;
    gameSet();
  //不正解
  } else {
    alert("Uncorrect!!!!!!!!");
    unCorrectCount++;
    //2回不正解したら次の問題にいく
    if(unCorrectCount == 2){
      gameSet();
    }
  }
}

/*--------------------------------------------*/
//一回目の呼び出し
gameSet();
