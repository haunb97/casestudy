const DIRECTION_SNAKE = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
};

let gameMusic = new Audio();
gameMusic.src = "assets/sound/start.mp3";
var ctx = document.getElementById("mycanvas").getContext("2d");
let directionSnake;
let score = 0;
let timeCreateSnake;

let Snake = function () {
  const originSpeed = 3;
  const originSnake = [
    {
      x: 160,
      y: 110,
    },
    {
      x: 160,
      y: 110,
    },
    {
      x: 159,
      y: 110,
    },
    {
      x: 158,
      y: 110,
    },
    {
      x: 157,
      y: 110,
    },
    {
      x: 156,
      y: 110,
    },
    {
      x: 155,
      y: 110,
    },
    {
      x: 154,
      y: 110,
    },
    {
      x: 153,
      y: 110,
    },
    {
      x: 152,
      y: 110,
    },
    {
      x: 151,
      y: 110,
    },
  ];
  this.speed = originSpeed;
  this.radius = 10;
  this.array = [];

  function createHead() {
    this.array = [
      {
        x: 160,
        y: 110,
      },
      {
        x: 160,
        y: 110,
      },
      {
        x: 159,
        y: 110,
      },
      {
        x: 158,
        y: 110,
      },
      {
        x: 157,
        y: 110,
      },
      {
        x: 156,
        y: 110,
      },
      {
        x: 155,
        y: 110,
      },
      {
        x: 154,
        y: 110,
      },
      {
        x: 153,
        y: 110,
      },
      {
        x: 152,
        y: 110,
      },
      {
        x: 151,
        y: 110,
      },
    ];
    this.speed = originSpeed;
  }

  function createSnake() {
    ctx.beginPath();
    ctx.arc(this.array[0].x, this.array[0].y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#1730ff";
    ctx.fill();
    ctx.stroke();
  }

  function createTail() {
    for (let i = this.array.length - 1; i > 0; i--) {
      // if(stop = 1 ){break}
      ctx.beginPath();

      // if ((directionSnake = DIRECTION_SNAKE.LEFT)) {
      //   this.array[i].x = this.array[i - 1].x - 5;
      // } else if ((directionSnake = DIRECTION_SNAKE.RIGHT)) {
      //   this.array[i].x = this.array[i - 1].x + 5;
      // } else if ((directionSnake = DIRECTION_SNAKE.up)) {
      //   this.array[i].y = this.array[i - 1].y - 5;
      // } else if ((directionSnake = DIRECTION_SNAKE.DOWN)) {
      //   this.array[i].y = this.array[i - 1].y + 5;
      // }
      this.array[i].x = this.array[i - 1].x;
      this.array[i].y = this.array[i - 1].y;
      ctx.arc(this.array[i].x, this.array[i].y, this.radius, 0, 2 * Math.PI);
      let grd = ctx.createLinearGradient(0, 0, 200, 0);
      grd.addColorStop(0, "#FC5C7D");
      grd.addColorStop(1, "#6A82FB");
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  //đầu chạm đuôi
  // function headVsArray() {
  //   for (let i = 2; i < this.array.length; i++) {
  //     if (
  //       this.array[0].x == this.array[i].x &&
  //       this.array[0].y == this.array[i].y
  //     ) {
  //       clearInterval(timeCreateSnake);
  //       setTimeout(() => {
  //         alert("game over");
  //       }, 100);
  //     }
  //   }
  // }

  this.createHead = createHead;
  this.createSnake = createSnake;
  this.createTail = createTail;
  // this.headVsArray = headVsArray;
};

let snake = new Snake();
snake.createHead();
let Food = function () {
  this.x = Math.floor(Math.random() * 101) * 3;
  this.y = Math.floor(Math.random() * 101) * 3;
  // this.radius = (Math.floor(Math.random()*10));
  this.taoFood = taoFood;

  function taoFood() {
    this.radius = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#27ff5d";
    ctx.fill();
    ctx.stroke();
  }
};

let food = new Food();
function snakeVsFood() {
  if (
    Math.abs(snake.array[0].x - food.x) <= 20 &&
    Math.abs(snake.array[0].y - food.y) <= 20
  ) {
    score++;
    snake.array.push({ x: food.x, y: food.y });
    food.x = Math.floor(Math.random() * 10 + 10) * 10;
    food.y = Math.floor(Math.random() * 10 + 10) * 10;
  }
}

// điều chỉnh hướng di chuyển của snake
document.addEventListener("keydown", move);
function move(event) {
  if (event.keyCode == 37 && directionSnake != DIRECTION_SNAKE.RIGHT) {
    directionSnake = DIRECTION_SNAKE.LEFT;
  } else if (event.keyCode == 38 && directionSnake != DIRECTION_SNAKE.DOWN) {
    directionSnake = DIRECTION_SNAKE.UP;
  } else if (event.keyCode == 39 && directionSnake != DIRECTION_SNAKE.LEFT) {
    directionSnake = DIRECTION_SNAKE.RIGHT;
  } else if (event.keyCode == 40 && directionSnake != DIRECTION_SNAKE.UP) {
    directionSnake = DIRECTION_SNAKE.DOWN;
  }

  switch (event.keyCode) {
    case 83:
      stop();
      break;
    case 82:
      resume();
      break;
    case 78:
      play();
      break;
  }
}

function startGame() {
  gameMusic.play();
  ctx.clearRect(0, 0, 400, 400);
  snake.createSnake();
  food.taoFood();
  snakeVsFood();
  snake.createTail();

  // snake.headVsArray();

  // chỉnh lại toạ độ đầu snake
  if (directionSnake == DIRECTION_SNAKE.LEFT) {
    snake.array[0].x -= snake.speed;
  }
  if (directionSnake == DIRECTION_SNAKE.RIGHT) {
    snake.array[0].x += snake.speed;
  }
  if (directionSnake == DIRECTION_SNAKE.UP) {
    snake.array[0].y -= snake.speed;
  }
  if (directionSnake == DIRECTION_SNAKE.DOWN) {
    snake.array[0].y += snake.speed;
  }

  // đầu snake chạm viền
  if (
    snake.array[0].x < 10 ||
    snake.array[0].x > 400 - 10 ||
    snake.array[0].y < 10 ||
    snake.array[0].y > 400 - 10
  ) {
    clearInterval(timeCreateSnake);
    timeCreateSnake = 0;
    setTimeout(() => {
      alert("game over");
    }, 100);
  }

  document.getElementById("score").innerHTML = "Score: " + score;
}

timeCreateSnake = setInterval(startGame, 20);

function stop() {
  snake.speed = 0;
}

function resume() {
  snake.speed = 5;
}

function play() {
  food = new Food();
  snake = new Snake();
  if (timeCreateSnake) {
    clearInterval(timeCreateSnake);
  }
  snake.createHead();
  directionSnake = undefined;
  timeCreateSnake = setInterval(startGame, 20);
}
