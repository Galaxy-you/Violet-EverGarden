(function () {
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".char-card[data-group]"));
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var group = button.getAttribute("data-filter");

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");

      cards.forEach(function (card) {
        var cardGroup = card.getAttribute("data-group");
        var show = group === "all" || group === cardGroup;
        card.classList.toggle("hidden", !show);
      });
    });
  });
})();
