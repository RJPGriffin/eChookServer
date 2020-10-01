var acc = document.getElementsByClassName("accordion");
var i, j;

var panels = document.getElementsByClassName("panel");


// for (j = 0; j < panels.length; j++) {
//   this.style.maxHeight = this.scrollHeight + "px";
// }

$(document).ready(function() {
  for (i = 0; i < acc.length; i++) {

    acc[i].classList.toggle("active");
    var panel = acc[i].nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
});

$(window).resize(function() {
  for (i = 0; i < acc.length; i++) {

    if (acc[i].classList.contains("active")) {
      var panel = acc[i].nextElementSibling;
      // if (panel.style.maxHeight) {
      //   panel.style.maxHeight = null;
      // } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      // }
    }
  }
});

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}