const blob = document.getElementById("blob");
let currentGradient = blob.style.background;
const defaultGradient = "linear-gradient(to bottom, #1B9CFC, #F7DC6F)";

function setBlobWidth() {
  blob.style.width = window.getComputedStyle(blob).height;
}

function transitionGradient(element, targetGradient, progress = 0) {
  const step = 0.1;
  if (progress < 1) {
    const intermediateGradient = element.style.background.replace(/[\d.]+(?=%)/g, (match) =>
      parseFloat(match) + (parseFloat(targetGradient.match(/[\d.]+(?=%)/g)[0]) - parseFloat(match)) * progress
    );
    element.style.background = intermediateGradient;
    requestAnimationFrame(() => transitionGradient(element, targetGradient, progress + step));
  } else {
    element.style.background = targetGradient;
  }
}

function updateBlobVisibility() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    blob.style.display = "block";
  } else {
    blob.style.display = "none";
  }
}

function moveBlobSmoothly(blob, targetX, targetY, startTime) {
  const duration = 5000; // Adjust the duration for smoother movement
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;

  if (elapsedTime < duration) {
    const progress = elapsedTime / duration;

    const currentLeft = parseFloat(blob.style.left || 0);
    const currentTop = parseFloat(blob.style.top || 0);

    const newLeft = currentLeft + (targetX - currentLeft) * progress;
    const newTop = currentTop + (targetY - currentTop) * progress;

    blob.style.left = `${newLeft}px`;
    blob.style.top = `${newTop}px`;

    requestAnimationFrame(() => moveBlobSmoothly(blob, targetX, targetY, startTime));
  } else {
    blob.style.left = `${targetX}px`;
    blob.style.top = `${targetY}px`;
  }
}

document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  let target = document.elementFromPoint(x, y);

  while (target && !target.hasAttribute("data-gradient")) {
    target = target.parentElement;
  }

  const targetGradient = target ? target.getAttribute("data-gradient") : defaultGradient;

  if (targetGradient !== currentGradient) {
    transitionGradient(blob, targetGradient);
    currentGradient = targetGradient;
  }

  // Move the blob with the mouse pointer smoothly
  const startTime = performance.now();
  moveBlobSmoothly(blob, x, y, startTime);
});

setBlobWidth();
updateBlobVisibility();
window.addEventListener("resize", () => {
  setBlobWidth();
  updateBlobVisibility();
});