var acc = document.getElementsByClassName("accordion");
var i, j;

var panels = document.getElementsByClassName("panel");


// for (j = 0; j < panels.length; j++) {
//   this.style.maxHeight = this.scrollHeight + "px";
// }


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
