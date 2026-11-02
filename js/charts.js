/* ==========================================================================
   charts.js — Chart.js charts.

   Responsive note: every <canvas> sits inside a `.chart-box` with a fixed
   height (see components.css) and `maintainAspectRatio` is false, so the
   chart always fills its box and re-fits when the window is resized.
   ========================================================================== */

let activeCharts = [];

function destroyCharts() {
  activeCharts.forEach((chart) => chart.destroy());
  activeCharts = [];
}

/* Chart.js is loaded from a CDN; skip charts quietly if it is unavailable */
function chartsAvailable() {
  return typeof Chart !== "undefined";
}

function createLineChart(canvas, data, color) {
  return new Chart(canvas, {
    type: "line",
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [
        {
          data,
          borderColor: color,
          backgroundColor: color + "22",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  });
}

function createCategoryChart(canvas) {
  return new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["الکترونیک", "مد و پوشاک", "خانه", "زیبایی", "ورزشی"],
      datasets: [
        {
          data: [38, 22, 16, 14, 10],
          backgroundColor: ["#3346ff", "#0891b2", "#16a34a", "#d97706", "#dc2626"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 8, font: { family: "Vazirmatn", size: 11 } },
        },
      },
    },
  });
}

/** Draws whichever charts exist on the current page. */
function renderCharts() {
  destroyCharts();
  if (!chartsAvailable()) return;

  const sales = document.getElementById("salesChart");
  if (sales) {
    activeCharts.push(createLineChart(sales, [12, 19, 14, 22, 18, 26, 21, 30, 25, 33, 28, 36, 31, 40], "#3346ff"));
  }

  const category = document.getElementById("categoryChart");
  if (category) activeCharts.push(createCategoryChart(category));

  const analytics = document.getElementById("analyticsChart");
  if (analytics) {
    activeCharts.push(createLineChart(analytics, [80, 95, 88, 110, 102, 130, 124, 150, 140, 168, 155, 184], "#16a34a"));
  }
}
