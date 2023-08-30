const textArr = ["नमस्ते दोस्त! 🙏🏻 ", "¡Hola amigo! 🙋🏻‍♂️ ", "Bonjour mon ami! 🖐🏻 ", "Hallo mein Freund! 👋🏻 ", "Ciao amico! 🙋🏻‍♂️ ", "Olá amigo! 🖐🏻 ", "你好朋友！👋🏻 ", "こんにちは、友達！🖐🏻 ", "안녕 친구! 🙋🏻‍♂️"]; 
const textSwitch = document.getElementById("text-switch");

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * textArr.length);
  const randomNumber = Math.floor(Math.random() * 100);
  if (randomNumber < 35) {
    textSwitch.innerHTML = "Hi there! 👋🏻";
  } else {
    textSwitch.innerHTML = textArr[randomIndex];
  }
}, 775);
