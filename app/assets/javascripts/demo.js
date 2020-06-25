let i = 0;
let v = 0;
let element = document.querySelector('.entry');
let speed = 50; /* The speed/duration of the effect in milliseconds */

const txt = `Welcome to The Simple Diary, a diary app designed to be easy to use.
 Click the demo button to see how the app works or log-in/sign-up!`;
const idButton = document.getElementById("demo-text");

const typeWriter = function() {
  if (i < txt.length) {
    document.getElementById("demo-text").innerHTML += txt.charAt(i);
    i++;

    if (txt.charAt(i) === ',' || txt.charAt(i) === '.' ) {
      v = i + 1;
    };

    if (i === v) {
      speed = 500
    } else {
    speed = (50 + (Math.random() * 20)) ;
    }

    setTimeout(typeWriter, speed);

  }
  element.setAttribute("contenteditable", "true");
}

if (idButton) {
  setTimeout(typeWriter, 1000);
};



const textDetector = function(){
  const text = document.getElementById('#demo-text')
  if text.innerHTML.length > 1
}
