const members = [
  { name: "Nadia Agustin Eka Pratiwi", role: "Anggota Sekbid Ketakwaan Tuhan YME", class: "XI B" },
  { name: "Mochammad Muzakki", role: "Anggota Sekbid Ketakwaan Tuhan YME", class: "X E" },
  { name: "Rama Naura Firdhausy", role: "Anggota sekbid Ketakwaan Tuhan YME", class: "X A" },
  
  { name: "Siti Isnaeni", role: "Anggota Sekbid Berbangsa Dan Bernegara", class: "XI E" },
  { name: "Destino Arif Prayoga", role: "Anggota Sekbid Berbangsa Dan Bernegara", class: "X C" },

  { name: "Nur Eliza Syahrani Oktaviana", role: "Anggota Sekbid Bela Negara", class: "XI A" },
  { name: "Rendi Rama Putra", role: "Anggota Sekbid Bela Negara", class: "X A" },

  { name: "Shinta Dona Puspita", role: "Anggota Sekbid Politik Dan Kepemimpinan", class: "XI B" },
  { name: "Raka Saputra", role: "Anggota Sekbid Politik Dan Kepemimpinan", class: "X F" },

  { name: "Avriana Aulia Putri", role: "Anggota Sekbid Budi Pekerti Luhur", class: "XI C" },
  { name: "Ezra Ramadhan", role: "Anggota Sekbid Budi Pekerti Luhur", class: "X C" },

  { name: "Aji Bhagawat Gita Tri Mulyana", role: "Anggota Sekbid Apresiasi Seni", class: "XI F" },
  { name: "Kiffty Anisa", role: "Anggota Sekbid Apresiasi Seni", class: "X F" },
  { name: "Aji Setiawan Darma", role: "Anggota Sekbid Apresiasi Seni", class: "X F" },
  
  { name: "Dahnial Safieq Shahriel", role: "Anggota Sekbid Kewirausahaan", class: "XI B" },
  { name: "Melisa Aira Bella", role: "Anggota Sekbid Kewirausahaan", class: "X B" },
  { name: "Attaya Kavita Ramadhani", role: "Anggota Sekbid Kewirausahaan", class: "X B" },
    
  { name: "Nindy Rahmawati", role: "Anggota Sekbid Kesehatan Jasmani", class: "X A" },
  { name: "Dea Ayu Primanda", role: "Anggota Sekbid Kesehatan Jasmani", class: "X A" },
  { name: "Shandy Fareza Arlaysia Putra", role: "Anggota Sekbid Kesehatan Jasmani", class: "X A" },
  
  { name: "Aprilia Lintang Ayu Keyla Farahdina", role: "Anggota Sekbid Publikasi Dokumentasi", class: "XI A" },
  { name: "Nevila Amelia Putri", role: "Anggota Sekbid Publikasi Dokimentasi", class: "X E" }
];

const membersGrid = document.getElementById("membersGrid");

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function renderMembers() {
  if (!membersGrid) return;

  membersGrid.innerHTML = "";

  members.forEach((member, index) => {
    const card = document.createElement("div");
    card.className = "member-card reveal";
    card.style.animationDelay = `${index * 0.04}s`;

    card.innerHTML = `
      <div class="member-top">
        <div class="member-avatar">${getInitials(member.name)}</div>

        <div>
          <h3>${member.name}</h3>
          <p>${member.role}</p>
        </div>
      </div>

      <span class="member-class">${member.class}</span>
    `;

    membersGrid.appendChild(card);
  });
}

function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function handleSmoothNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

function handleHeroParallax() {
  const heroVisual = document.querySelector(".hero-visual");
  const mainCard = document.querySelector(".main-card");
  const orbOne = document.querySelector(".orb-one");
  const orbTwo = document.querySelector(".orb-two");

  if (!heroVisual || !mainCard) return;

  window.addEventListener("scroll", () => {
    const scrollValue = window.scrollY;

    if (scrollValue < window.innerHeight) {
      mainCard.style.transform = `rotate(-4deg) translateY(${scrollValue * 0.04}px)`;

      if (orbOne) {
        orbOne.style.transform = `translateY(${scrollValue * 0.06}px)`;
      }

      if (orbTwo) {
        orbTwo.style.transform = `translateY(${-scrollValue * 0.04}px)`;
      }
    }
  });
}

function handleCardMouseMove() {
  const cards = document.querySelectorAll(
    ".member-card, .program-card, .mission-card, .activity-card, .stat-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);
        let current = 0;
        const increment = Math.ceil(target / 80);

        const interval = setInterval(() => {
          current += increment;

          if (current >= target) {
            counter.textContent = target;
            clearInterval(interval);
          } else {
            counter.textContent = current;
          }
        }, 18);

        counterObserver.unobserve(counter);
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function addActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active-link");
      }
    });
  });
}

function createFloatingParticles() {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  const particleWrapper = document.createElement("div");
  particleWrapper.className = "particle-wrapper";

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");

    const size = Math.random() * 7 + 4;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 6;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    particleWrapper.appendChild(particle);
  }

  hero.appendChild(particleWrapper);
}

window.addEventListener("scroll", handleNavbarScroll);

document.addEventListener("DOMContentLoaded", () => {
  renderMembers();
  handleNavbarScroll();
  handleRevealAnimation();
  handleSmoothNavigation();
  handleHeroParallax();
  handleCardMouseMove();
  animateCounters();
  addActiveNavOnScroll();
  createFloatingParticles();
});
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}
function setupFotoBersama() {
  const photoCard = document.querySelector(".photo-card");
  const photoImage = document.getElementById("osisPhoto");

  if (!photoCard || !photoImage) return;

  window.addEventListener("scroll", () => {
    const rect = photoCard.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const move = (progress - 0.5) * 30;

      photoImage.style.transform = `scale(1.06) translateY(${move}px)`;
    }
  });

  photoCard.addEventListener("mouseenter", () => {
    photoImage.style.transform = "scale(1.08)";
  });

  photoCard.addEventListener("mouseleave", () => {
    photoImage.style.transform = "";
  });
}

setupFotoBersama();

const osisStructure = {
  leader: {
    name: "Praditya Dawwas Pambudi",
    role: "Ketua OSIS",
    className: "XI E",
    division: "Pimpinan Utama",
    description:
      "Memimpin arah gerak kabinet, mengambil keputusan strategis, dan memastikan seluruh program OSIS berjalan selaras dengan visi organisasi.",
    photo:
      "https://i.ibb.co.com/V0qgmTM5/DSC0526.webp"
  },

  core: [
    {
      name: "Srikandi Puspita Sayekti",
      role: "Wakil Ketua I",
      className: "X A",
      division: "Koordinasi Internal",
      description:
        "Menguatkan komunikasi antaranggota, menjaga kedisiplinan, dan mendampingi ketua dalam pengelolaan internal OSIS.",
      photo:
        "https://i.ibb.co.com/4wMGZRF7/DSC0484.webp"
    },
    
    {
      name: "Nikeizya Amelyana Hafidzah",
      role: "Sekretaris I",
      className: "XI F",
      division: "Administrasi",
      description:
        "Mengatur dokumen, notulensi, surat-menyurat, dan arsip organisasi agar seluruh kegiatan tercatat dengan rapi.",
      photo:
        "https://i.ibb.co.com/jZBT2Yds/DSC0408.webp"
    },
    {
      name: "Anindra Agisna Wibowo",
      role: "Sekretaris II",
      className: "X D",
      division: "Administrasi Pendukung",
      description:
        "Membantu pengelolaan administrasi, pendataan kegiatan, dan koordinasi kebutuhan dokumen OSIS.",
      photo:
        "https://i.ibb.co.com/yc40DYY8/DSC0531.webp"
    },
    {
      name: "Cantika Eka Safira",
      role: "Bendahara I",
      className: "XI F",
      division: "Keuangan",
      description:
        "Mengelola pemasukan, pengeluaran, dan laporan keuangan organisasi secara transparan dan bertanggung jawab.",
      photo:
        "https://i.ibb.co.com/2Y1rGzMv/DSC0485.webp"
    },
    {
      name: "Adnan Septian Harianto",
      role: "Bendahara II",
      className: "X E",
      division: "Keuangan Pendukung",
      description:
        "Mendampingi bendahara utama dalam pencatatan dana, kebutuhan kegiatan, dan rekap keuangan OSIS.",
      photo:
        "https://i.ibb.co.com/whZkFKTr/DSC0516.webp"
    }
  ],

  divisions: [
    {
      name: "Rezha Delvi Septavia",
      role: "Koordinator Sekbid Ketakwaan Tuhan YME",
      className: "XI E",
      division: "Keimanan & Ketakwaan",
      description:
        "Menggerakkan kegiatan keagamaan, pembiasaan karakter spiritual, dan program peningkatan nilai religius di lingkungan sekolah.",
      photo:
        "https://i.ibb.co.com/RpVvt626/DSC0419.webp"
    },
    {
      name: "Favian Satya Saputra",
      role: "Koordinator Sekbid Berbangsa Dan Bernegara",
      className: "XI F",
      division: "Budi Pekerti & Akhlak",
      description:
        "Mendorong budaya sopan santun, etika, kepedulian sosial, dan karakter positif seluruh siswa.",
      photo:
        "https://i.ibb.co.com/xSjZ4HG3/DSC0523.webp"
    },
    {
      name: "Talita Ike Yuliawati",
      role: "Koordinator Sekbid Bela Negara",
      className: "XI B",
      division: "Kepribadian Unggul",
      description:
        "Membangun mental kepemimpinan, kedisiplinan, tanggung jawab, dan sikap percaya diri siswa.",
      photo:
        "https://i.ibb.co.com/fYt1Jcrq/DSC0478.webp"
    },
    {
      name: "Reza Handri Oktavian",
      role: "Koordinator Sekbid Politik Dan Kepemimpinan",
      className: "XI B",
      division: "Prestasi Akademik",
      description:
        "Mendukung kegiatan akademik, kompetisi, literasi, dan peningkatan prestasi siswa di berbagai bidang.",
      photo:
        "https://i.ibb.co.com/rf1cZwSX/DSC0525.webp"
    },
    {
      name: "Jovita Wanda Kirana",
      role: "Koordinator Sekbid Budi Pekerti Luhur",
      className: "XI B",
      division: "Demokrasi & HAM",
      description:
        "Membuka ruang aspirasi, diskusi, musyawarah, dan pembelajaran demokrasi yang sehat di lingkungan sekolah.",
      photo:
        "https://i.ibb.co.com/DDvb59w5/DSC0505.webp"
    },
    {
      name: "Aurelliya Avisa Iftitah Ramadhani",
      role: "Koordinator Sekbid Apresiasi Seni",
      className: "XI A",
      division: "Sastra & Budaya",
      description:
        "Menghidupkan Kegiatan seni, sastra, budaya, literasi, dan ekspresi kreatif siswa.",
      photo:
        "https://i.ibb.co.com/99jLn2m1/DSC0507.webp"
    },
    {
      name: "Cikita Dwi Safitri",
      role: "Koordinator Sekbid Kewirausahaan",
      className: "XI D",
      division: "Kreativitas & Kewirausahaan",
      description:
        "Mengembangkan kreativitas, inovasi, karya siswa, dan semangat kewirausahaan, melalui program OSIS.",
      photo:
        "https://i.ibb.co.com/6JZvHz6K/DSC0480.webp"
    },
    {
      name: "Niko Juliansyah",
      role: "Koordinator Sekbid Kesehatan Jasmani",
      className: "XI C",
      division: "Jasmani & Kesehatan",
      description:
        "Mengelola program olahraga, kesehatan, kebugaran, dan gaya hidup aktif bagi seluruh siswa.",
      photo:
        "https://i.ibb.co.com/N24tf3fs/DSC0437.webp"
    },
    {
      name: "Mecky Dail Abila",
      role: "Koordinator Sekbid Publikasi Dokumentasi",
      className: "XI E",
      division: "Teknologi Informasi",
      description:
        "Mengembangkan publikasi digital, teknologi, desain, dokumentasi, dan media informasi OSIS.",
      photo:
        "https://i.ibb.co.com/PsPg0c9S/DSC0426.webp"
    },
  ]
};

function createStructureCard(person, type = "compact") {
  const card = document.createElement("div");
  card.className = `structure-person-card ${type}`;

  card.innerHTML = `
    <div class="structure-photo">
      <img src="${person.photo}" alt="Foto ${person.name}" loading="lazy">
      <span class="structure-role-badge">${person.role}</span>
    </div>

    <div class="structure-info">
      <h3>${person.name}</h3>
      <p>${person.division}</p>
      <small>${person.description}</small>

      <div class="structure-meta">
        <span>${person.className}</span>
        <span>${person.role}</span>
      </div>
    </div>
  `;

  return card;
}

function createStructureCard(person, type = "compact") {
  const card = document.createElement("div");
  card.className = `structure-person-card ${type}`;

  card.innerHTML = `
    <div class="structure-photo">
      <img src="${person.photo}" alt="Foto ${person.name}" loading="lazy">
      <span class="structure-role-badge">${person.role}</span>
    </div>

    <div class="structure-info">
      <h3>${person.name}</h3>
      <p>${person.division}</p>
      <small>${person.description}</small>

      <div class="structure-meta">
        <span>${person.className}</span>
        <span>${person.role}</span>
      </div>
    </div>
  `;

  return card;
}

function renderOsisStructure() {
  const structureMain = document.getElementById("structureMain");
  const structureCore = document.getElementById("structureCore");
  const structureDivisions = document.getElementById("structureDivisions");

  if (!structureMain || !structureCore || !structureDivisions) {
    console.log("Container struktur OSIS belum ada di HTML.");
    return;
  }

  if (typeof osisStructure === "undefined") {
    console.log("Data osisStructure belum ada di script.js.");
    return;
  }

  structureMain.innerHTML = "";
  structureCore.innerHTML = "";
  structureDivisions.innerHTML = "";

  const leaderCard = createStructureCard(osisStructure.leader, "featured");
  structureMain.appendChild(leaderCard);

  osisStructure.core.forEach((person) => {
    const card = createStructureCard(person, "compact");
    structureCore.appendChild(card);
  });

  osisStructure.divisions.forEach((person) => {
    const card = createStructureCard(person, "division");
    structureDivisions.appendChild(card);
  });
}

function setupStructurePhotoFallback() {
  const images = document.querySelectorAll(".structure-photo img");

  images.forEach((img) => {
    img.addEventListener("error", () => {
      const parent = img.parentElement;

      img.remove();

      const fallback = document.createElement("div");
      fallback.className = "structure-photo-fallback";

      fallback.textContent = parent
        .querySelector(".structure-role-badge")
        .textContent.substring(0, 2)
        .toUpperCase();

      parent.prepend(fallback);
    });
  });
}

function setupStructureCardEffect() {
  const cards = document.querySelectorAll(".structure-person-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initOsisStructure() {
  renderOsisStructure();
  setupStructurePhotoFallback();
  setupStructureCardEffect();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initOsisStructure);
} else {
  initOsisStructure();
}

function setupStructurePhotoError() {
  const structureImages = document.querySelectorAll(".structure-photo img");

  structureImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";

      const fallback = document.createElement("div");
      fallback.className = "structure-photo-fallback";

      fallback.textContent = img.alt
        .replace("Foto ", "")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      img.parentElement.appendChild(fallback);
    });
  });
}

function setupStructureTiltEffect() {
  const cards = document.querySelectorAll(".structure-person-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderOsisStructure();
  setupStructurePhotoError();
  setupStructureTiltEffect();
});

/*--tesdoaoaoakak--*/
function setupStructureDetailModal() {
  const modal = document.createElement("div");

  modal.className = "structure-detail-modal";
  modal.innerHTML = `
    <div class="structure-detail-backdrop"></div>

    <div class="structure-detail-box">
      <button class="structure-detail-close" type="button">×</button>

      <div class="structure-detail-photo">
        <img src="" alt="">
      </div>

      <div class="structure-detail-content">
        <span class="structure-detail-role"></span>
        <h3 class="structure-detail-name"></h3>
        <p class="structure-detail-division"></p>

        <div class="structure-detail-meta">
          <span class="structure-detail-class"></span>
          <span class="structure-detail-position"></span>
        </div>

        <small class="structure-detail-description"></small>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const style = document.createElement("style");

  style.textContent = `
    .structure-detail-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s ease;
    }

    .structure-detail-modal.active {
      opacity: 1;
      visibility: visible;
    }

    .structure-detail-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(9, 9, 11, 0.62);
      backdrop-filter: blur(16px);
    }

    .structure-detail-box {
      position: relative;
      z-index: 2;
      width: min(920px, 100%);
      max-height: 90vh;
      overflow: hidden;
      border-radius: 36px;
      background: white;
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.28);
      transform: translateY(30px) scale(0.96);
      transition: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .structure-detail-modal.active .structure-detail-box {
      transform: translateY(0) scale(1);
    }

    .structure-detail-close {
      position: absolute;
      top: 18px;
      right: 18px;
      z-index: 5;
      width: 42px;
      height: 42px;
      border: none;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
      color: #09090b;
      font-size: 28px;
      line-height: 1;
      cursor: pointer;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
      transition: 0.25s ease;
    }

    .structure-detail-close:hover {
      background: var(--primary);
      color: white;
      transform: rotate(90deg);
    }

    .structure-detail-photo {
      min-height: 520px;
      background: #e4e4e7;
      overflow: hidden;
    }

    .structure-detail-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .structure-detail-content {
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .structure-detail-content::before {
      content: "";
      position: absolute;
      width: 260px;
      height: 260px;
      top: -120px;
      right: -120px;
      border-radius: 999px;
      background: rgba(79, 70, 229, 0.1);
    }

    .structure-detail-role {
      position: relative;
      z-index: 2;
      width: fit-content;
      display: inline-flex;
      padding: 9px 15px;
      border-radius: 999px;
      background: #eef2ff;
      color: var(--primary);
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 18px;
    }

    .structure-detail-name {
      position: relative;
      z-index: 2;
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(34px, 5vw, 58px);
      line-height: 1;
      letter-spacing: -0.07em;
      margin-bottom: 14px;
      color: #09090b;
    }

    .structure-detail-division {
      position: relative;
      z-index: 2;
      color: var(--primary);
      font-size: 18px;
      font-weight: 900;
      margin-bottom: 20px;
    }

    .structure-detail-meta {
      position: relative;
      z-index: 2;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 24px;
    }

    .structure-detail-meta span {
      padding: 9px 13px;
      border-radius: 12px;
      background: #f4f4f5;
      color: #52525b;
      font-size: 13px;
      font-weight: 800;
    }

    .structure-detail-description {
      position: relative;
      z-index: 2;
      color: #52525b;
      font-size: 16px;
      line-height: 1.9;
      font-weight: 600;
    }

    body.modal-open {
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .structure-detail-box {
        grid-template-columns: 1fr;
        overflow-y: auto;
      }

      .structure-detail-photo {
        min-height: 320px;
      }

      .structure-detail-content {
        padding: 32px 24px;
      }
    }
  `;

  document.head.appendChild(style);

  const modalImage = modal.querySelector(".structure-detail-photo img");
  const modalRole = modal.querySelector(".structure-detail-role");
  const modalName = modal.querySelector(".structure-detail-name");
  const modalDivision = modal.querySelector(".structure-detail-division");
  const modalClass = modal.querySelector(".structure-detail-class");
  const modalPosition = modal.querySelector(".structure-detail-position");
  const modalDescription = modal.querySelector(".structure-detail-description");
  const closeButton = modal.querySelector(".structure-detail-close");
  const backdrop = modal.querySelector(".structure-detail-backdrop");

  function openModal(person) {
    modalImage.src = person.photo;
    modalImage.alt = `Foto ${person.name}`;
    modalRole.textContent = person.role;
    modalName.textContent = person.name;
    modalDivision.textContent = person.division;
    modalClass.textContent = person.className;
    modalPosition.textContent = person.role;
    modalDescription.textContent = person.description;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  closeButton.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  setTimeout(() => {
    const allPeople = [
      osisStructure.leader,
      ...osisStructure.core,
      ...osisStructure.divisions
    ];

    const cards = document.querySelectorAll(".structure-person-card");

    cards.forEach((card, index) => {
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        const person = allPeople[index];

        if (person) {
          openModal(person);
        }
      });
    });
  }, 100);
}

function setupStructureEntranceAnimation() {
  const structureCards = document.querySelectorAll(".structure-person-card");

  if (structureCards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("structure-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  structureCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(34px)";
    card.style.transition = "0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transitionDelay = `${index * 0.04}s`;

    observer.observe(card);
  });

  const style = document.createElement("style");

  style.textContent = `
    .structure-person-card.structure-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(style);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    setupStructureDetailModal();
    setupStructureEntranceAnimation();
  }, 150);
});

function setupOsisLogoShowcase() {
  const showcase = document.getElementById("osisLogoShowcase");
  const logoFrame = document.getElementById("logoFrame");
  const logoImage = document.getElementById("osisLogoImage");
  const logoFallback = document.getElementById("logoFallback");

  if (!showcase || !logoFrame || !logoImage || !logoFallback) return;

  logoImage.addEventListener("error", () => {
    logoImage.style.display = "none";
    logoFallback.style.display = "grid";
  });

  logoImage.addEventListener("load", () => {
    logoImage.style.display = "block";
    logoFallback.style.display = "none";
  });

  logoFrame.addEventListener("mousemove", (event) => {
    const rect = logoFrame.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    logoFrame.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  logoFrame.addEventListener("mouseleave", () => {
    logoFrame.style.transform = "";
  });

  window.addEventListener("scroll", () => {
    const rect = showcase.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const move = (progress - 0.5) * 28;

      logoFrame.style.translate = `0 ${move}px`;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupOsisLogoShowcase);
} else {
  setupOsisLogoShowcase();
}

function setupOsisAlbumSlider() {
  const slider = document.getElementById("albumSlider");
  const cards = document.querySelectorAll(".album-card");
  const prevButton = document.getElementById("albumPrev");
  const nextButton = document.getElementById("albumNext");
  const dotsContainer = document.getElementById("albumDots");
  const progressBar = document.getElementById("albumProgressBar");

  const modal = document.getElementById("albumModal");
  const modalImage = document.getElementById("albumModalImage");
  const modalNumber = document.getElementById("albumModalNumber");
  const modalTitle = document.getElementById("albumModalTitle");
  const modalDescription = document.getElementById("albumModalDescription");
  const modalClose = document.getElementById("albumModalClose");
  const modalBackdrop = document.getElementById("albumModalBackdrop");

  if (
    !slider ||
    cards.length === 0 ||
    !prevButton ||
    !nextButton ||
    !dotsContainer ||
    !progressBar
  ) {
    return;
  }

let currentIndex = 0;
let startX = 0;
let endX = 0;
let autoSlideInterval;
let autoSlideDelay = 3000;

  cards.forEach((card, index) => {
    const dot = document.createElement("button");
    dot.className = "album-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Buka album ${index + 1}`);

   dot.addEventListener("click", () => {
  showAlbum(index);
  restartAutoSlide();
});

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".album-dot");

  function showAlbum(index) {
    if (index < 0) {
      currentIndex = cards.length - 1;
    } else if (index >= cards.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    cards.forEach((card, cardIndex) => {
      card.classList.remove("active", "prev-slide");

      if (cardIndex < currentIndex) {
        card.classList.add("prev-slide");
      }

      if (cardIndex === currentIndex) {
        card.classList.add("active");
      }
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentIndex);
    });

    const progress = ((currentIndex + 1) / cards.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function nextAlbum() {
    showAlbum(currentIndex + 1);
  }

  function prevAlbum() {
    showAlbum(currentIndex - 1);
  }

function startAutoSlide() {
  stopAutoSlide();

  autoSlideInterval = setInterval(() => {
    nextAlbum();
  }, autoSlideDelay);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

 nextButton.addEventListener("click", () => {
  nextAlbum();
  restartAutoSlide();
});

prevButton.addEventListener("click", () => {
  prevAlbum();
  restartAutoSlide();
});

  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  slider.addEventListener("touchend", () => {
    const distance = startX - endX;

    if (Math.abs(distance) > 55) {
      if (distance > 0) {
        nextAlbum();
      } else {
        prevAlbum();
      }
    }

    startX = 0;
    endX = 0;
  });

  cards.forEach((card) => {
    const image = card.querySelector(".album-image img");
    const imageBox = card.querySelector(".album-image");
    const number = card.querySelector(".album-info span");
    const title = card.querySelector(".album-info h4");
    const description = card.querySelector(".album-info p");

    imageBox.addEventListener("click", () => {
      if (!modal || !modalImage) return;

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalNumber.textContent = number.textContent;
      modalTitle.textContent = title.textContent;
      modalDescription.textContent = description.textContent;

      modal.classList.add("active");
      document.body.classList.add("album-open");
    });

    image.addEventListener("error", () => {
      imageBox.style.background =
        "linear-gradient(135deg, #eef2ff, #dbeafe)";
      image.style.display = "none";

      const fallback = document.createElement("div");
      fallback.style.width = "100%";
      fallback.style.height = "100%";
      fallback.style.display = "grid";
      fallback.style.placeItems = "center";
      fallback.style.color = "var(--primary)";
      fallback.style.fontFamily = '"Space Grotesk", sans-serif';
      fallback.style.fontSize = "42px";
      fallback.style.fontWeight = "900";
      fallback.textContent = "Album OSIS";

      imageBox.appendChild(fallback);
    });
  });

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    document.body.classList.remove("album-open");
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    const albumSection = document.getElementById("album-osis");

    if (event.key === "Escape") {
      closeModal();
    }

    if (!albumSection) return;

    const rect = albumSection.getBoundingClientRect();
    const isAlbumVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlbumVisible && event.key === "ArrowRight") {
      nextAlbum();
    }

    if (isAlbumVisible && event.key === "ArrowLeft") {
      prevAlbum();
    }
  });

slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

slider.addEventListener("touchstart", () => {
  stopAutoSlide();
});

slider.addEventListener("touchend", () => {
  restartAutoSlide();
});

  showAlbum(0);
  startAutoSlide();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupOsisAlbumSlider);
} else {
  setupOsisAlbumSlider();
}

function setupDesktopDropdownMenu() {
  const toggle = document.getElementById("desktopMenuToggle");
  const menu = document.getElementById("desktopDropdownMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();

    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      menu.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      toggle.classList.remove("active");
      menu.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggle.classList.remove("active");
      menu.classList.remove("active");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupDesktopDropdownMenu);
} else {
  setupDesktopDropdownMenu();
}

function setupFeedbackSection() {
  const form = document.getElementById("feedbackForm");
  const nameInput = document.getElementById("feedbackName");
  const messageInput = document.getElementById("feedbackMessage");
  const commentsList = document.getElementById("feedbackCommentsList");
  const feedbackCount = document.getElementById("feedbackCount");
  const feedbackNote = document.getElementById("feedbackNote");

  if (
    !form ||
    !nameInput ||
    !messageInput ||
    !commentsList ||
    !feedbackCount ||
    !feedbackNote
  ) {
    return;
  }

  let comments = [];

  // Identitas anonim per-browser supaya hanya komentar sendiri yang bisa dihapus.
  const CLIENT_ID_KEY = "lasoma_client_id";
  let clientId = "";
  try {
    clientId = localStorage.getItem(CLIENT_ID_KEY) || "";
    if (!clientId) {
      clientId =
        (crypto && crypto.randomUUID && crypto.randomUUID()) ||
        "c_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(CLIENT_ID_KEY, clientId);
    }
  } catch (e) {
    clientId = "c_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  function getInitials(name) {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }

  function formatDate(value) {
    let date;
    if (value && typeof value.toDate === "function") {
      date = value.toDate();
    } else if (value instanceof Date) {
      date = value;
    } else {
      date = new Date();
    }
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function createCommentElement(comment) {
    const item = document.createElement("article");
    item.className = "feedback-comment";

    const isOwner = comment.ownerId && comment.ownerId === clientId;
    const deleteButtonHtml = isOwner
      ? `<button type="button" class="feedback-delete" title="Hapus komentar" aria-label="Hapus komentar">
          <i class="fas fa-trash"></i>
        </button>`
      : "";

    item.innerHTML = `
      <div class="feedback-comment-top">
        <div class="feedback-comment-user">
          <div class="feedback-avatar">${getInitials(comment.name)}</div>

          <div>
            <h4>${comment.name}</h4>
            <span>${formatDate(comment.createdAt)}</span>
          </div>
        </div>
        ${deleteButtonHtml}
      </div>

      <p>${comment.message}</p>
    `;

    if (isOwner) {
      const deleteBtn = item.querySelector(".feedback-delete");
      deleteBtn.addEventListener("click", async () => {
        if (!window.firebaseDB || !comment.id) return;
        const ok = window.confirm("Hapus komentar kamu?");
        if (!ok) return;
        try {
          deleteBtn.disabled = true;
          await window.firebaseDB.deleteComment(comment.id);
        } catch (err) {
          console.error(err);
          alert("Gagal menghapus komentar. Coba lagi.");
          deleteBtn.disabled = false;
        }
      });
    }

    return item;
  }

  function renderComments() {
    commentsList.innerHTML = "";
    feedbackCount.textContent = comments.length;

    if (comments.length === 0) {
      commentsList.innerHTML = `
        <div class="feedback-empty">
          <div>
            <h4>Belum Ada Komentar</h4>
            <p>
              Jadilah yang pertama menulis saran atau kritik untuk OSIS.
            </p>
          </div>
        </div>
      `;
      return;
    }

    comments.forEach((comment) => {
      commentsList.appendChild(createCommentElement(comment));
    });

    commentsList.scrollTop = commentsList.scrollHeight;
  }

  function cleanText(text) {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trim();
  }

  function startFirestoreListener() {
    if (!window.firebaseDB) return false;
    window.firebaseDB.listenComments((items) => {
      comments = items;
      renderComments();
    });
    return true;
  }

  if (!startFirestoreListener()) {
    window.addEventListener("firebase-ready", startFirestoreListener, { once: true });
  }

  renderComments();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = cleanText(nameInput.value);
    const message = cleanText(messageInput.value);

    if (name.length < 2 || message.length < 3) {
      feedbackNote.textContent = "Nama dan komentar harus diisi dengan benar.";
      feedbackNote.className = "feedback-note error";
      return;
    }

    if (!window.firebaseDB) {
      feedbackNote.textContent = "Database belum siap. Coba lagi sebentar.";
      feedbackNote.className = "feedback-note error";
      return;
    }

    try {
      feedbackNote.textContent = "Mengirim komentar...";
      feedbackNote.className = "feedback-note";
      await window.firebaseDB.addComment({ name, message, ownerId: clientId });

      form.reset();
      feedbackNote.textContent = "Komentar berhasil dikirim.";
      feedbackNote.className = "feedback-note success";

      setTimeout(() => {
        feedbackNote.textContent =
          "Komentar kamu akan langsung muncul di daftar komentar.";
        feedbackNote.className = "feedback-note";
      }, 2500);
    } catch (err) {
      console.error(err);
      feedbackNote.textContent = "Gagal mengirim komentar. Coba lagi.";
      feedbackNote.className = "feedback-note error";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupFeedbackSection);
} else {
  setupFeedbackSection();
}

document.querySelectorAll(".social-button").forEach(button => {
  button.addEventListener("click", () => {
    const link = button.getAttribute("data-link");
    if (link) {
      window.open(link, "_blank");
    }
  });
});
