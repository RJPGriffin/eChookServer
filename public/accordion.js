var acc = document.getElementsByClassName("accordion");
var i;

var panels = document.getElementsByClassName("panel");


// for (i = 0; i < panels.length; i++) {
//   this.style.maxHeight = panel.scrollHeight + "px";
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
