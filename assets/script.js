// Loader
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("done"),
    2000,
  );
});

// Cursor
const dot = document.querySelector(".cursor-dot"),
  ring = document.querySelector(".cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});
function loop() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(loop);
}
loop();
document.querySelectorAll("a,button,.chip,.proj,.info,.btn").forEach((el) => {
  el.addEventListener("mouseenter", () => ring.classList.add("hover"));
  el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
});

// Particles
const c = document.getElementById("particles"),
  ctx = c.getContext("2d");
let W, H, parts;
function resize() {
  W = c.width = innerWidth;
  H = c.height = innerHeight;
  parts = Array.from(
    { length: Math.min(90, Math.floor((W * H) / 18000)) },
    () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }),
  );
}
resize();
addEventListener("resize", resize);
const colors = ["#6366f1", "#ec4899", "#22d3ee", "#f59e0b"];
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = colors[i % 4];
    ctx.globalAlpha = 0.7;
    ctx.fill();
    for (let j = i + 1; j < parts.length; j++) {
      const q = parts[j],
        dx = p.x - q.x,
        dy = p.y - q.y,
        d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.globalAlpha = (1 - d / 130) * 0.25;
        ctx.strokeStyle = colors[i % 4];
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();

// Intersection Observer
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        if (e.target.classList.contains("bar-fill"))
          e.target.style.width = e.target.dataset.w + "%";
      }
    }),
  { threshold: 0.2 },
);
document
  .querySelectorAll(".tl-item,.proj,.bar-fill")
  .forEach((el) => io.observe(el));

// Active nav
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
addEventListener("scroll", () => {
  let cur = "";
  sections.forEach((s) => {
    if (scrollY >= s.offsetTop - 200) cur = s.id;
  });
  links.forEach((l) =>
    l.classList.toggle("active", l.getAttribute("href") === "#" + cur),
  );
});

// 3D card tilt
const card = document.querySelector(".card3d");
if (card) {
  card.parentElement.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.animation = "none";
    card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateY(-6px)`;
  });
  card.parentElement.addEventListener("mouseleave", () => {
    card.style.animation = "";
    card.style.transform = "";
  });
}
