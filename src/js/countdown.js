const targetDate = new Date("May 7, 2026 00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    document.querySelector(".subtitle").textContent =
      "Today is the special day filled with love!";

    // allow surprise page
    localStorage.setItem("surpriseUnlocked", "yes");

    setTimeout(() => {
      window.location.href = "/happymothersday";
    }, 2000);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);



const icons = ["❤", "💐", "🌸", "✨", "🌷", "💖"];

function createFloatingIcon() {
  const icon = document.createElement("div");
  icon.className = "floating";
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];

  icon.style.left = Math.random() * 100 + "vw";
  icon.style.fontSize = Math.random() * 18 + 18 + "px";
  icon.style.animationDuration = Math.random() * 7 + 8 + "s";

  document.body.appendChild(icon);

  setTimeout(() => {
    icon.remove();
  }, 15000);
}

setInterval(createFloatingIcon, 550);

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";

  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 3000);
}

setInterval(createSparkle, 350);


