
const WHATSAPP="27000000000";
function wa(text){window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,"_blank")}
document.querySelectorAll("[data-order]").forEach(b=>b.addEventListener("click",()=>wa(`Hello Liivhuu's Baking Adventure!\n\nI'd like to order: ${b.dataset.order}\n\nPlease confirm availability and price.`)));
const form=document.querySelector("#cakeForm");
if(form) form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);wa(`Hello Liivhuu's Baking Adventure!\n\nI'd like a custom cake quote.\n\nName: ${d.get("name")}\nDate: ${d.get("date")}\nCake size: ${d.get("size")}\nFlavour: ${d.get("flavour")}\nTheme: ${d.get("theme")}\nNotes: ${d.get("notes")}`)});
document.querySelector(".mobile")?.addEventListener("click",()=>document.querySelector(".links").classList.toggle("open"));
