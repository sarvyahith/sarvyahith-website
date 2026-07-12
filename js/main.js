const menuBtn = document.getElementById("menu-btn");

const sidebar = document.getElementById("sidebar");

const closeBtn = document.getElementById("close-btn");

const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {

    sidebar.classList.add("show");

    overlay.classList.add("show");

});

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

function closeMenu(){

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

}