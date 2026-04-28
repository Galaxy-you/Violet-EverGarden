(function () {
  var heroImage = document.getElementById("hero-image");
  if (!heroImage) return;

  var raw = heroImage.getAttribute("data-images");
  if (!raw) return;
  var list = raw.split("|").filter(Boolean);
  if (list.length < 2) return;

  var index = 0;
  window.setInterval(function () {
    index = (index + 1) % list.length;
    heroImage.src = list[index];
  }, 5500);
})();
