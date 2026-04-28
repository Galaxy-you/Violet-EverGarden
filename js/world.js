(function () {
  var chips = document.querySelectorAll(".chip");
  var cards = document.querySelectorAll(".world-card");
  if (!chips.length || !cards.length) return;

  function applyFilter(type) {
    cards.forEach(function (card) {
      if (type === "all" || card.getAttribute("data-type") === type) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (x) {
        x.classList.remove("active");
      });
      chip.classList.add("active");
      applyFilter(chip.getAttribute("data-filter"));
    });
  });
})();
