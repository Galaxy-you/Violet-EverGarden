(function () {
  var heroImage = document.getElementById("hero-image");
  if (!heroImage) return;

  var raw = heroImage.getAttribute("data-images");
  if (!raw) return;
  var list = raw.split("|").filter(Boolean);
  if (list.length < 2) return;
  var dots = document.querySelectorAll("[data-slide-dot]");

  var index = 0;
  function render(nextIndex) {
    index = nextIndex;
    heroImage.src = list[index];
    dots.forEach(function (dot) {
      var dotIndex = Number(dot.getAttribute("data-slide-dot"));
      dot.classList.toggle("is-active", dotIndex === index);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var dotIndex = Number(dot.getAttribute("data-slide-dot"));
      if (dotIndex >= 0 && dotIndex < list.length) {
        render(dotIndex);
      }
    });
  });

  window.setInterval(function () {
    index = (index + 1) % list.length;
    render(index);
  }, 5500);
})();
