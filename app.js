"use strict";

// Progressive enhancement: prices and contact links also work without JavaScript.
document.documentElement.classList.add("js");

const menu = document.querySelector("#mobile-menu");
const menuButton = document.querySelector("#menu-button");
const closeButton = document.querySelector("#menu-close");

function closeMenu() {
  if (menu.open) menu.close();
}

menuButton.addEventListener("click", () => {
  menu.showModal();
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
});
closeButton.addEventListener("click", closeMenu);
menu.addEventListener("close", () => {
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
});
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
  if (event.target === menu) {
    const box = menu.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) closeMenu();
  }
});
window.matchMedia("(min-width: 980px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const orderForm = document.querySelector("#order-form");
orderForm.hidden = false;
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#order-number");
  if (!orderForm.reportValidity()) return;
  const message = `Hola, quiero consultar el estado de mi pedido N.º ${input.value.trim()} de SpeedClean.`;
  window.location.assign(`https://wa.me/5491141988584?text=${encodeURIComponent(message)}`);
});
