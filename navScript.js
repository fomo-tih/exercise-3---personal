// Wait until the DOM is fully loaded before running script
document.addEventListener("DOMContentLoaded", () => {

  // ===================== NAVIGATION BAR =====================
  const navItems = document.querySelectorAll(".nav-item");
  const logo = document.querySelector(".logo a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html"; 

  navItems.forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("is-active");
    }

    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("href");
      if (target) window.location.assign(target);
    });
  });

  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.assign("index.html");
    });
  }

  // ===================== PORTFOLIO TABS =====================
  const tabs = document.querySelectorAll(".portfolio-tabs .tab");
  const contents = document.querySelectorAll(".tab-content");

  function activateTab(tabName) {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));
    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(tabName);
    if (activeTab) activeTab.classList.add("active");
    if (activeContent) activeContent.classList.add("active");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.tab.trim());
    });
  });

  // ===================== ABOUT STATS SHORTCUTS =====================
  const statsLinks = document.querySelectorAll(".about-stats-row .stat");
  statsLinks.forEach((stat) => {
    stat.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = stat.dataset.target;
      const showcase = document.getElementById("portfolio-showcase");
      if (showcase) {
        showcase.scrollIntoView({ behavior: "smooth" });
      }
      if (targetId) {
        activateTab(targetId);
      }
    });
  });

  // ===================== CARD EXPAND FEATURE =====================
  const detailButtons = document.querySelectorAll(".card button");

  detailButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering card click if any
      const card = button.closest(".card");

      // Remove active from all cards first
      document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      // Create overlay if not already present
      let overlay = document.querySelector(".card-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("card-overlay");
        document.body.appendChild(overlay);
      }

      // Clone clicked card into overlay
      const clone = card.cloneNode(true);
      clone.classList.add("expanded");

      // 🔹 Remove the "More Details" button from expanded card
      const buttonInside = clone.querySelector("button");
      if (buttonInside) buttonInside.remove();

      overlay.innerHTML = "";
      overlay.appendChild(clone);

      // Add close button
      const closeBtn = document.createElement("div");
      closeBtn.classList.add("close-btn");
      closeBtn.innerHTML = "&times;";
      overlay.appendChild(closeBtn);

      // Show overlay
      overlay.style.display = "flex";

      // Close overlay when X is clicked
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        overlay.style.display = "none";
        card.classList.remove("active");
      });

      // Close overlay if background clicked
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.style.display = "none";
          card.classList.remove("active");
        }
      });
    });
  });

});
