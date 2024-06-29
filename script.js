// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Custom cursor
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    const dot = document.createElement("div");
    dot.classList.add("dot");
    cursor.appendChild(dot);
    document.body.appendChild(cursor);

    document.addEventListener("mousemove", function(e) {
        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";
    });

    // Smooth scrolling effect without page scroll
    let scrollPosition = 0;
    let targetScrollPosition = 0;

    window.addEventListener("wheel", function(e) {
        e.preventDefault();
        targetScrollPosition += e.deltaY * 0.8; // Adjust scroll speed
    });

    function smoothScroll() {
        scrollPosition += (targetScrollPosition - scrollPosition) * 0.1;

        const textElements = document.querySelectorAll(".scrolling-text");
        const leftColumnImages = document.querySelectorAll(".left-column img");
        const rightColumnImages = document.querySelectorAll(".right-column img");

        textElements.forEach(text => {
            text.style.transform = `translateX(${-scrollPosition * 1.5}px)`;
        });

        leftColumnImages.forEach((img, index) => {
            img.style.transform = `translateY(${-scrollPosition * 0.5}px)`;
        });

        rightColumnImages.forEach((img, index) => {
            img.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });

        requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
});


console.clear();
var log = console.log.bind(console);

var baseUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/";

var vw = window.innerWidth;
var vh = window.innerHeight;

var app = new PIXI.Application({
  width: vw,
  height: vh,
  view: document.getElementById("canvas"),
  resizeTo: window,
  transparent: true // Make canvas background transparent
});

var loader = new PIXI.Loader(baseUrl)
  .add("displacementMap", "displacementmap2.png?v=1")
  .load(init);

function init(loader, resources) {
  var displacementSprite = new PIXI.Sprite(resources.displacementMap.texture);
  var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  displacementSprite.width = vw;
  displacementSprite.height = vh;

  app.stage.addChild(displacementSprite);
  app.stage.filters = [displacementFilter];
    
  gsap.to(displacementSprite, {
    duration: 5,
    ease: "none",
    repeat: -1,
    x: "+=512",
    y: "+=512"
  });

  // Stop the effect after 1 minute
  setTimeout(() => {
    app.stop();
    document.getElementById("canvas").remove();
  }, 60000);
}

// Adjust the canvas size when the window is resized
window.addEventListener("resize", () => {
  vw = window.innerWidth;
  vh = window.innerHeight;
  app.renderer.resize(vw, vh);
  displacementSprite.width = vw;
  displacementSprite.height = vh;
});