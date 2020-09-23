$("#editor").focus()
$("#editor").on("blur", () => $("#editor").focus())
function runner() {
  var lines = $("#editor").html().split("<div>");
  $.each(lines, function(n, elem) {
     if (typeof compile(elem.replace(/<\/div>$/, "")) == "undefined") {
         return;
     } else {
       console.log(compile(elem.replace(/<\/div>$/, "")))
     }
  });
}
Object.defineProperty(window, 'run', { get: runner });