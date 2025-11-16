const toggleThemeBtn = document.getElementById("toggle-theme");

const logListEl = document.getElementById("log-list");

const startTestBtn = document.getElementById("start-test");
const stopTestBtn = document.getElementById("stop-test");
const progressEl = document.getElementById("progress");
const statusEl = document.getElementById("status");

toggleThemeBtn.addEventListener("click", () => {
  const nonce = toggleThemeBtn.getAttribute("data-nonce");
  const enableDisable = disableAnimation(nonce);

  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleThemeBtn.innerHTML = isDark ? MoonIcon : SunIcon;

  enableDisable();
});

const disableAnimation = (nonce) => {
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

async function fetchLogs() {
  try {
    const res = await fetch("/logs");
    if (!res.ok) {
      console.error("Failed to fetch logs", res.status);
      return;
    }
    const data = await res.json();

    logListEl.innerHTML = "";

    data.forEach((line) => {
      const li = document.createElement("li");
      li.classList.add("log-list__item");
      li.textContent = line;
      logListEl.appendChild(li);
    });

    if (logListEl.lastChild)
      logListEl.lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
  } catch (err) {
    console.error("Error fetching logs:", err);
  }
}

let intervalId;

startTestBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  startTestBtn.disabled = true;
  stopTestBtn.disabled = false;

  const interval = parseInt(document.getElementById("interval").value);
  const count = parseInt(document.getElementById("count").value);

  await fetch("/start-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interval, count }),
  });

  progressEl.value = 0;
  statusEl.textContent = "Bắt đầu kiểm tra...";
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(updateStatus, 1000);
});

stopTestBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  startTestBtn.disabled = false;
  stopTestBtn.disabled = true;

  await fetch("/stop-test", { method: "POST" });
  if (intervalId) clearInterval(intervalId);
});

async function updateStatus() {
  const res = await fetch("/test-status");
  const data = await res.json();

  const percent = data.total ? (data.sent / data.total) * 100 : 0;
  progressEl.value = percent;

  statusEl.textContent = `Đã gửi: ${data.sent}/${data.total} | Thành công: ${data.success} | Thất bại: ${data.failed}`;

  if (!data.running) {
    clearInterval(intervalId);
    startTestBtn.disabled = false;
    stopTestBtn.disabled = true;
  }
}

window.addEventListener("load", () => {
  const nonce = window.crypto.getRandomValues(new Uint32Array(4)).join("");
  toggleThemeBtn.setAttribute("data-nonce", nonce);

  fetchLogs();
  setInterval(fetchLogs, 2000);

  if (localStorage.getItem("theme") === "dark") {
    const enableDisable = disableAnimation(nonce);
    document.documentElement.classList.add("dark");
    toggleThemeBtn.innerHTML = MoonIcon;
    enableDisable();
  } else {
    toggleThemeBtn.innerHTML = SunIcon;
  }
});

const SunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
const MoonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
