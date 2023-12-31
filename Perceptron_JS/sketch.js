

// một dãy các phần tử được dùng để training Perceptron
let training = new Array(2000);
// một phần tử Perceptron
let ptron;

// train Perceptron mỗi lần 1 phần tử 
let count = 0;

// tọa độ
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

// hàm vẽ đường thẳng phân chia các phần tử
function f(x) {
  let y = 0.3 * x + 0.4;
  return y;
}

function setup() {
  createCanvas(400, 400);

  // Perceptron có 3 biến là x, y và bias
  // giá trị thứ 2 là hằng số học
  ptron = new Perceptron(3, 0.001); // không nhất thiết phải tối ưu hằng số học

  // tạo một tập hợp các điểm đào tạo ngẫu nhiên và tính toán giá trị trả về của Perceptron
  for (let i = 0; i < training.length; i++) {
    let x = random(xmin, xmax);
    let y = random(ymin, ymax);
    let answer = 1;
    if (y < f(x)) answer = -1;
    training[i] = {
      input: [x, y, 1],
      output: answer
    };
  }
}


function draw() {
  background(0);

  // vẽ đường thẳng
  strokeWeight(1);
  stroke(255);
  let x1 = map(xmin, xmin, xmax, 0, width);
  let y1 = map(f(xmin), ymin, ymax, height, 0);
  let x2 = map(xmax, xmin, xmax, 0, width);
  let y2 = map(f(xmax), ymin, ymax, height, 0);
  line(x1, y1, x2, y2);

  // vẽ một đường thẳng dựa trên trọng số hiện tại
  // công thức là weights[0]*x + weights[1]*y + weights[2] = 0
  stroke(255);
  strokeWeight(2);
  let weights = ptron.getWeights();
  x1 = xmin;
  y1 = (-weights[2] - weights[0] * x1) / weights[1];
  x2 = xmax;
  y2 = (-weights[2] - weights[0] * x2) / weights[1];

  x1 = map(x1, xmin, xmax, 0, width);
  y1 = map(y1, ymin, ymax, height, 0);
  x2 = map(x2, xmin, xmax, 0, width);
  y2 = map(y2, ymin, ymax, height, 0);
  line(x1, y1, x2, y2);


  // huấn luyện Perceptron với một giá trị training tại 1 thời điểm
  ptron.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;

  // vẽ tất cả những điểm dựa trên những cái Perceptron có thể đoán 
  // không được sửa dụng kết quả đã biết 
  for (let i = 0; i < count; i++) {
    stroke(255);
    strokeWeight(1);
    fill(255);
    let guess = ptron.feedforward(training[i].input);
    if (guess > 0) noFill();

    let x = map(training[i].input[0], xmin, xmax, 0, width);
    let y = map(training[i].input[1], ymin, ymax, height, 0);
    ellipse(x, y, 8, 8);
  }
}
