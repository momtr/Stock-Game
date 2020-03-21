let x;
let y;
let buy;
let sell;

let start;
let current;
let fullCounter;

let velocity;
let fluctuating;
let frequency;
let gain;
let gain_priority;

let money;
let stocks;

let auto;

function setup() {

  createCanvas(700, 700);

  x = [];
  y = [];
  buy = [];
  sell = [];

  start = 0;
  current = 0;
  fullCounter = 0;

  velocity = 10;
  fluctuating = 100; //default: 100 => if the price fluctuates
  frequency = 400; //default: 300 => if prices steps per year are rather high/low (generally, the bigger the more expensive the stock)
  gain = 0; //random
  gain_priority = 1; //highest gain value

  money = 1000;
  stocks = 0;

  auto = false; //auto buy all OR sell all per tick

  for(var i = 0; i < 20000; i++){
    x.push(i);
    y.push(frequency*noise(i/fluctuating, i/fluctuating));
    buy.push(i);
    sell.push(i);
  }

}

function draw() {

  current++;

  background(0);

  gain += random(gain_priority);
  gain -= random(gain_priority);
  y[current+1] += gain;

  var crash = random(150);
  if(crash <= 10 && crash >= 9){
    let add = random(100);
    for(var i = current; i < current+random(200); i++){
      y[i] = y[i] - add;
    }
  }


  stroke(255);
  strokeWeight(4);
  line(30, 400, 630, 400);
  line(30, 400, 30, 30);

  strokeWeight(0.05);
  textSize(20);
  fill(255);
  text("€", 40, 30);
  text("years", 620, 420);

  for(var i = 0; i < 600; i++){
    if(i != 0 && i % 50 == 0){
      strokeWeight(2);
      line(30 + i, 390, 30 + i, 410);
      strokeWeight(0.05);
      textSize(10);
      text(i/100, 25 + i, 425);
    }
  }
  for(var i = 0; i < 370; i++){
    if(i != 0 && i % 20 == 0){
      strokeWeight(1);
      line(20, 400-i, 40, 400-i);
      strokeWeight(0.05);
      textSize(10);
      text(i, 10, 400-i);
    }
  }

  strokeWeight(1);
  fill(255,255,0);
  for(var i = start; i < current; i++){
    if(i != 0) {
      line(x[i-1]+30-600*fullCounter, 400-y[i-1], x[i]+30-600*fullCounter, 400-y[i]);
    } 
  }

  textSize(10);
  if(y[current-10] < y[current]) fill(0,255,0);
  else fill(255,0,0);
  text("€"+y[current], width/2, 30);

  fill(255,0,0);
  for(var i = start; i < current; i++){
    if(i != 0) {
      if(sell[i] == 1){
        ellipse(x[i]+30-600*fullCounter, 400-y[i], 4, 4);
      }
    } 
  }

  fill(0,255,0);
  for(var i = start; i < current; i++){
    if(i != 0) {
      if(buy[i] == 1){
        ellipse(x[i]+30-600*fullCounter, 400-y[i], 4, 4);
      }
    } 
  }

  textSize(40);
  text("stocks: " + stocks, 40, 550);
  if(money >= 0) {
   fill(0,255,0);
  } else {
    fill(255,0,0);
  }
  text("bank: €" + money + ",--", 40, 490);
  textSize(20);
  text("1 = sell | 2 = buy | 3 = sell all | 4 = buy all | 5 = auto", 40, 600);

  if(current != 0 && current % 600 == 0){
    console.log("overflow");
    fullCounter++;
    start += 600;
    console.log("current price: " + y[current]);
    console.log("current year: " + x[current] / 100);
  }

  if(auto){

    if(current % 10 == 0){
      buyAll();
    } else if(current % 6 == 0){
      sellAll();
    }

  }
}

function keyPressed() {
  if(key == '1'){

    if(stocks > 0) {
      console.log("sell");
      sell[current] = 1;
      stocks--;
      money += y[current];
    }

  } else if(key == '2'){

    if(money >= -100) {
      console.log("buy");
      buy[current] = 1;
      stocks++;
      money -= y[current];
    }

  } else if(key == '3'){
    sellAll();

  } else if(key == '4'){
    buyAll();

  } else if(key == '5'){

    auto = !auto;

  }
}

function buyAll(){
  while(money - y[current] >= 0) {
      console.log("buy");
      buy[current] = 1;
      money -= y[current];
      stocks++;
    }
}
function sellAll(){
  if(stocks != 0) {
      console.log("sell");
      sell[current] = 1;
      money += stocks * y[current];
      stocks = 0;
    }
}