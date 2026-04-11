/* Portfolio Script */

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
anchor.addEventListener('click', function(e) {
e.preventDefault();


    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
});


});

// Navbar Shadow on Scroll
window.addEventListener("scroll", function() {
var navbar = document.querySelector(".navbar");


if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
} else {
    navbar.style.boxShadow = "none";
}


});

// Active Link Highlighting
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", function() {
var current = "";


sections.forEach(function(section) {
    var sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
    }
});

navLinks.forEach(function(link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
    }
});


});

// Typing Effect
var text = "Building Data-Driven Solutions 🚀";
var index = 0;

function typeEffect() {
var element = document.querySelector(".hero p");
if (!element) return;


if (index < text.length) {
    element.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
}


}

window.addEventListener("load", function() {
var heroText = document.querySelector(".hero p");
if (heroText) {
heroText.innerHTML = "";
typeEffect();
}
});

// Console Message
console.log("Aditya's Portfolio Loaded");