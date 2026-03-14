/* ════ ÉTAT GLOBAL ════ */
var fabOpen = false;
var hcOn = false;
var fsLevel = 0;
var curLang = "fr";

/* ════ TRADUCTIONS ════ */
var TR = {
  fr: {
    nav: [
      "Accueil",
      "À propos",
      "Compétences",
      "Formations",
      "Projets",
      "Certifications",
      "Veille",
      "Contact",
    ],
    thd: "Mode sombre",
    thl: "Mode clair",
    sbtn: "Envoyer le message",
    sending: "Envoi en cours...",
    sent: "Message envoyé ! Je vous répondrai dans les plus brefs délais.",
    alert: "Veuillez remplir tous les champs obligatoires.",
  },
  en: {
    nav: ["Home", "About", "Skills", "Education", "Projects", "Certifications", "Tech Watch", "Contact"],
    thd: "Dark mode",
    thl: "Light mode",
    sbtn: "Send message",
    sending: "Sending...",
    sent: "Message sent! I will get back to you shortly.",
    alert: "Please fill in all required fields.",
  },
  es: {
    nav: [
      "Inicio",
      "Sobre mí",
      "Habilidades",
      "Formación",
      "Proyectos",
      "Certificaciones",
      "Vigilancia",
      "Contacto",
    ],
    thd: "Modo oscuro",
    thl: "Modo claro",
    sbtn: "Enviar mensaje",
    sending: "Enviando...",
    sent: "¡Mensaje enviado!",
    alert: "Por favor rellena todos los campos.",
  },
  de: {
    nav: [
      "Start",
      "Über mich",
      "Fähigkeiten",
      "Ausbildung",
      "Projekte",
      "Zertifikate",
      "Tech-News",
      "Kontakt",
    ],
    thd: "Dunkler Modus",
    thl: "Heller Modus",
    sbtn: "Nachricht senden",
    sending: "Wird gesendet...",
    sent: "Nachricht gesendet!",
    alert: "Bitte alle Felder ausfüllen.",
  },
};

/* ════ FAB ════ */
function toggleFab() {
  fabOpen = !fabOpen;
  document.getElementById("fabmain").classList.toggle("spin", fabOpen);
  document.getElementById("fabtools").classList.toggle("show", fabOpen);
  if (!fabOpen) {
    closeLang();
    closeA11();
  }
}

/* ════ THÈME ════ */
function toggleTheme() {
  var h = document.documentElement;
  var dark = h.getAttribute("data-theme") === "dark";
  h.setAttribute("data-theme", dark ? "light" : "dark");
  document.getElementById("thico").className = dark
    ? "fas fa-moon"
    : "fas fa-sun";
  var t = TR[curLang];
  document.getElementById("thlbl").textContent = dark ? t.thd : t.thl;
}

/* ════ LANGUE ════ */
function toggleLang() {
  var d = document.getElementById("langdrop");
  var open = d.classList.contains("show");
  closeA11();
  d.classList.toggle("show", !open);
}
function closeLang() {
  document.getElementById("langdrop").classList.remove("show");
}
function setLang(l) {
  curLang = l;
  var t = TR[l];
  document.documentElement.lang = l;
  var links = document.querySelectorAll(".nav-links a");
  t.nav.forEach(function (txt, i) {
    if (links[i]) links[i].textContent = txt;
  });
  var dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.getElementById("thlbl").textContent = dark ? t.thl : t.thd;
  var btn = document.getElementById("sbtn");
  if (btn && !btn.disabled)
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + t.sbtn;
  document.querySelectorAll(".dopt").forEach(function (o) {
    o.classList.toggle(
      "cur",
      o.getAttribute("onclick") === "setLang('" + l + "')",
    );
  });
  document.getElementById("lcur").textContent = {
    fr: "Français",
    en: "English",
    es: "Español",
    de: "Deutsch",
  }[l];
  closeLang();
}

/* ════ ACCESSIBILITÉ ════ */
function toggleA11() {
  var p = document.getElementById("a11p");
  var open = p.classList.contains("show");
  closeLang();
  p.classList.toggle("show", !open);
}
function closeA11() {
  document.getElementById("a11p").classList.remove("show");
}
function toggleHC() {
  hcOn = !hcOn;
  document.documentElement.setAttribute("data-hc", hcOn ? "on" : "off");
  document.getElementById("hctog").classList.toggle("on", hcOn);
}
function setFS(n) {
  fsLevel = n;
  var map = ["", "lg", "xl"];
  document.documentElement.setAttribute("data-fs", map[n]);
  [0, 1, 2].forEach(function (i) {
    document.getElementById("fs" + i).classList.toggle("on", i === n);
  });
}

/* ════ MODALS ════ */
function openM(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeM(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.remove("open");
  document.body.style.overflow = "";
}

/* ════ FORMULAIRE ════ */
function sendMsg(e) {
  e.preventDefault();
  var t = TR[curLang];
  var f1 = document.getElementById("fi1").value.trim();
  var f3 = document.getElementById("fi3").value.trim();
  var f5 = document.getElementById("fi5").value.trim();
  if (!f1 || !f3 || !f5) {
    alert(t.alert);
    return;
  }
  var btn = document.getElementById("sbtn");
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t.sending;
  btn.disabled = true;
  setTimeout(function () {
    btn.style.display = "none";
    var s = document.getElementById("fsuc");
    s.style.display = "flex";
    s.innerHTML = '<i class="fas fa-check-circle"></i> ' + t.sent;
    ["fi1", "fi2", "fi3", "fi4", "fi5"].forEach(function (id) {
      document.getElementById(id).value = "";
    });
    setTimeout(function () {
      s.style.display = "none";
      btn.style.display = "flex";
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> ' + t.sbtn;
      btn.disabled = false;
    }, 5000);
  }, 1500);
}

/* ════ INIT ════ */
window.addEventListener("load", function () {
  /* Année footer */
  document.getElementById("yr").textContent = new Date().getFullYear();

  /* Fermer dropdowns au clic extérieur */
  document.addEventListener("click", function (e) {
    var lw = document.getElementById("langwrap");
    var aw = document.getElementById("a11wrap");
    if (lw && !lw.contains(e.target)) closeLang();
    if (aw && !aw.contains(e.target)) closeA11();
  });

  /* Scroll progress + nav active */
  window.addEventListener(
    "scroll",
    function () {
      var st = window.scrollY;
      var h = document.body.scrollHeight - window.innerHeight;
      document.getElementById("bar").style.width =
        (h > 0 ? (st / h) * 100 : 0) + "%";
      document.getElementById("nav").classList.toggle("scrolled", st > 60);
      var cur = "";
      document.querySelectorAll("section[id]").forEach(function (s) {
        if (st >= s.offsetTop - 130) cur = s.id;
      });
      document.querySelectorAll(".nav-links a").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
      });
    },
    { passive: true },
  );

  /* Burger menu mobile */
  document.getElementById("burger").addEventListener("click", function () {
    document.getElementById("nl").classList.toggle("open");
  });
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.getElementById("nl").classList.remove("open");
    });
  });

  /* Fermer modals sur fond ou Escape */
  document.querySelectorAll(".mo").forEach(function (o) {
    o.addEventListener("click", function (e) {
      if (e.target === o) closeM(o.id);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".mo.open").forEach(function (o) {
        closeM(o.id);
      });
    }
  });

  /* ════ REVEAL ANIMATIONS ════
     On affiche immédiatement les éléments visibles dans la fenêtre,
     et on utilise IntersectionObserver pour les autres.
  */
  var revEls = Array.from(document.querySelectorAll(".rv,.rvl,.rvr"));

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    revEls.forEach(function (el, i) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setTimeout(function () {
          el.classList.add("on");
        }, i * 50);
      } else {
        obs.observe(el);
      }
    });
  } else {
    /* Fallback si IntersectionObserver non supporté : tout afficher */
    revEls.forEach(function (el) {
      el.classList.add("on");
    });
  }

  /* ════ BARRES DE COMPÉTENCES ════ */
  var skillGrid = document.getElementById("skillGrid");
  if (skillGrid) {
    var skillFired = false;
    function animateSkills() {
      if (skillFired) return;
      skillFired = true;
      skillGrid.querySelectorAll(".sfill").forEach(function (bar) {
        var p = bar.getAttribute("data-p") || 0;
        setTimeout(function () {
          bar.style.width = p + "%";
        }, 100);
      });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) animateSkills();
          });
        },
        { threshold: 0.1 },
      ).observe(skillGrid);
    } else {
      animateSkills();
    }
  }

  /* ════ VEILLE TECHNOLOGIQUE – RSS LIVE (rss2json.com) ════ */

  var VEILLE_CATS = [
    { keys: ["cisco","network","réseau","router","switch","vlan","ccna","wan","lan","firewall","packet","ospf","bgp"],
      label: "Réseau & Infrastructure", icon: "fa-network-wired",
      grad: "linear-gradient(135deg,#2563eb,#3b82f6)" },
    { keys: ["security","securit","cyber","hack","vulner","exploit","malware","ransomware","phishing","breach","zero-day","cve","patch","threat","attack","password","credential"],
      label: "Cybersécurité", icon: "fa-shield-alt",
      grad: "linear-gradient(135deg,#059669,#10b981)" },
    { keys: ["ai","artificial intelligence","machine learning","deep learning","llm","gpt","chatgpt","ia ","neural","model","openai","gemini","claude","copilot","mistral"],
      label: "Intelligence Artificielle", icon: "fa-brain",
      grad: "linear-gradient(135deg,#7c3aed,#a855f7)" },
    { keys: ["cloud","aws","azure","gcp","kubernetes","docker","devops","container","deploy","ci/cd","terraform","serverless","microservice"],
      label: "Cloud & DevOps", icon: "fa-cloud",
      grad: "linear-gradient(135deg,#dc2626,#f87171)" },
    { keys: ["mobile","android","ios","flutter","swift","kotlin","react native","smartphone","app store","google play"],
      label: "Développement Mobile", icon: "fa-mobile-alt",
      grad: "linear-gradient(135deg,#d97706,#f59e0b)" },
    { keys: ["wifi","wi-fi","5g","6g","bluetooth","iot","internet of things","edge","wireless","4g","lte","satellite"],
      label: "Connectivité & IoT", icon: "fa-broadcast-tower",
      grad: "linear-gradient(135deg,#0891b2,#06b6d4)" },
    { keys: ["python","javascript","java","php","rust","golang","typescript","framework","api","github","open source","linux","programming"],
      label: "Développement", icon: "fa-code",
      grad: "linear-gradient(135deg,#be185d,#ec4899)" },
    { keys: ["data","database","sql","nosql","postgresql","mongodb","analytics","big data","breach","leak","privacy"],
      label: "Data & Vie privée", icon: "fa-database",
      grad: "linear-gradient(135deg,#0f766e,#14b8a6)" },
  ];
  var DEFAULT_CAT = { label: "Tech & Numérique", icon: "fa-microchip", grad: "linear-gradient(135deg,#475569,#64748b)" };

  /* ── Sources RSS – double proxy pour fiabilité maximale ── */
  var RSS2JSON   = "https://api.rss2json.com/v1/api.json?count=12&rss_url=";
  var CORSPROXY  = "https://corsproxy.io/?";

  var RSS_SOURCES = [
    /* ── 🇫🇷 Cybersécurité FR ── */
    { name: "LeMonde Informatique – Sécu",  url: "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml" },
    { name: "IT-Connect",                   url: "https://www.it-connect.fr/feed/" },
    { name: "Korben",                       url: "https://korben.info/feed" },
    { name: "CERT-FR (ANSSI)",              url: "https://www.cert.ssi.gouv.fr/feed/" },
    /* ── 🇫🇷 Informatique & IA FR ── */
    { name: "LeMonde Informatique – IA",    url: "https://www.lemondeinformatique.fr/flux-rss/thematique/intelligence-artificielle/rss.xml" },
    { name: "LeMonde Informatique – Dev",   url: "https://www.lemondeinformatique.fr/flux-rss/thematique/developpement/rss.xml" },
    { name: "LeMonde Informatique – Cloud", url: "https://www.lemondeinformatique.fr/flux-rss/thematique/cloud-et-datacenter/rss.xml" },
    { name: "LeMonde Informatique – Réseau",url: "https://www.lemondeinformatique.fr/flux-rss/thematique/reseau-et-telecoms/rss.xml" },
    { name: "Silicon.fr",                   url: "https://www.silicon.fr/feed" },
    { name: "Le Monde – IA",               url: "https://www.lemonde.fr/intelligence-artificielle/rss_full.xml" },
    /* ── 🇬🇧 Cybersécurité & Tech EN ── */
    { name: "The Hacker News",              url: "https://feeds.feedburner.com/TheHackersNews" },
    { name: "BleepingComputer",             url: "https://www.bleepingcomputer.com/feed/" },
    { name: "Krebs on Security",            url: "https://krebsonsecurity.com/feed/" },
    { name: "Ars Technica",                 url: "https://feeds.arstechnica.com/arstechnica/technology-lab" },
  ];

  var veilleLoaded = false;
  var tickerAnimId = null;
  var tickerPos    = 0;
  var tickerSpeed  = 0;

  /* ── Utilitaires ── */
  function getCat(text) {
    var low = (text || "").toLowerCase();
    for (var i = 0; i < VEILLE_CATS.length; i++) {
      for (var j = 0; j < VEILLE_CATS[i].keys.length; j++) {
        if (low.indexOf(VEILLE_CATS[i].keys[j]) !== -1) return VEILLE_CATS[i];
      }
    }
    return DEFAULT_CAT;
  }
  function formatDate(d) {
    if (!d) return "";
    try {
      var dt = new Date(d);
      if (isNaN(dt)) return "";
      return dt.toLocaleDateString("fr-FR", { day:"2-digit", month:"short", year:"numeric" });
    } catch(e) { return ""; }
  }
  function stripHtml(h) {
    var t = document.createElement("div"); t.innerHTML = h || "";
    return (t.textContent || t.innerText || "").replace(/\s+/g," ").trim();
  }
  function trunc(s, n) { s = s || ""; return s.length > n ? s.slice(0,n).trim()+"…" : s; }

  /* ── Parse XML brut (fallback corsproxy) ── */
  function parseXML(xmlText, srcName) {
    try {
      var doc = new DOMParser().parseFromString(xmlText, "text/xml");
      var items = doc.querySelectorAll("item, entry");
      var out = [];
      items.forEach(function(it) {
        var title   = it.querySelector("title");
        var link    = it.querySelector("link");
        var desc    = it.querySelector("description, summary, content");
        var date    = it.querySelector("pubDate, published, updated");
        var linkHref = link ? (link.getAttribute("href") || link.textContent || "").trim() : "#";
        out.push({
          title:  title  ? stripHtml(title.textContent)  : "Sans titre",
          link:   linkHref || "#",
          desc:   desc   ? stripHtml(desc.textContent)   : "",
          date:   date   ? date.textContent               : "",
          source: srcName
        });
      });
      return out;
    } catch(e) { return []; }
  }

  /* ── Fetch via rss2json (primaire) puis corsproxy (fallback) ── */
  function fetchSource(src) {
    /* Tentative 1 : rss2json */
    return fetch(RSS2JSON + encodeURIComponent(src.url), { signal: AbortSignal.timeout(8000) })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.status === "ok" && data.items && data.items.length) {
          return data.items.map(function(it) {
            return {
              title:  stripHtml(it.title)  || "Sans titre",
              link:   it.link              || "#",
              desc:   stripHtml(it.description || it.content || ""),
              date:   it.pubDate           || "",
              source: src.name
            };
          });
        }
        throw new Error("rss2json empty");
      })
      .catch(function() {
        /* Tentative 2 : corsproxy → parse XML direct */
        return fetch(CORSPROXY + encodeURIComponent(src.url), { signal: AbortSignal.timeout(8000) })
          .then(function(r) { return r.text(); })
          .then(function(txt) { return parseXML(txt, src.name); })
          .catch(function() { return []; });
      });
  }

  /* ── Construction d'une carte ── */
  function buildCard(item) {
    var cat  = getCat(item.title + " " + item.desc);
    var card = document.createElement("div");
    card.className = "veille-card";
    card.innerHTML =
      '<div class="veille-card-top">' +
        '<div class="veille-ico" style="background:' + cat.grad + '">' +
          '<i class="fas ' + cat.icon + '"></i></div>' +
        '<div class="veille-content">' +
          '<div class="veille-cat">'   + cat.label              + '</div>' +
          '<div class="veille-title">' + trunc(item.title, 90)  + '</div>' +
          '<div class="veille-desc">'  + trunc(item.desc,  170) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="veille-footer">' +
        '<span class="veille-date"><i class="fas fa-clock"></i> ' + formatDate(item.date) + '</span>' +
        '<span class="veille-source">' + trunc(item.source, 22) + '</span>' +
        (item.link && item.link !== "#"
          ? '<a class="veille-link" href="' + item.link + '" target="_blank" rel="noopener">Lire <i class="fas fa-arrow-right"></i></a>'
          : '') +
      '</div>';
    return card;
  }

  /* ── Ticker ── */
  function startTicker(items) {
    var inner = document.getElementById("tickerInner");
    if (!inner || !items.length) return;
    inner.innerHTML = "";
    items.slice(0, 20).forEach(function(it){
      var s = document.createElement("span");
      s.textContent = it.title;
      inner.appendChild(s);
    });
    inner.innerHTML += inner.innerHTML; /* boucle seamless */
    if (tickerAnimId) cancelAnimationFrame(tickerAnimId);
    tickerPos = 0; tickerSpeed = 0.5;
    (function animate(){
      tickerPos -= tickerSpeed;
      if (Math.abs(tickerPos) >= inner.scrollWidth / 2) tickerPos = 0;
      inner.style.transform = "translateX(" + tickerPos + "px)";
      tickerAnimId = requestAnimationFrame(animate);
    })();
    var track = document.getElementById("tickerTrack");
    if (track) {
      track.onmouseenter = function(){ tickerSpeed = 0; };
      track.onmouseleave = function(){ tickerSpeed = 0.5; };
    }
  }

  function setStatus(msg, cls) {
    var el = document.getElementById("veilleStatus");
    if (!el) return;
    el.className = "veille-status " + (cls || "");
    el.innerHTML = msg;
  }

  function showSkeletons(grid) {
    grid.innerHTML = Array(6).fill(
      '<div class="veille-skeleton"><div class="sk-ico"></div>' +
      '<div class="sk-lines"><div class="sk-line w60"></div>' +
      '<div class="sk-line w90"></div><div class="sk-line w75"></div></div></div>'
    ).join("");
  }

  /* ── Chargement principal ── */
  window.loadVeille = function(force) {
    if (veilleLoaded && !force) return;
    var grid = document.getElementById("veilleGrid");
    var btn  = document.getElementById("veilleRefresh");
    if (!grid) return;

    if (btn) btn.classList.add("spinning");
    setStatus('<i class="fas fa-circle-notch fa-spin"></i> Récupération des flux RSS en cours…');
    showSkeletons(grid);

    Promise.all(RSS_SOURCES.map(fetchSource)).then(function(results){
      var all = [];
      results.forEach(function(arr){ all = all.concat(arr); });

      /* Déduplication par titre */
      var seen = {};
      all = all.filter(function(item){
        var k = item.title.slice(0,60).toLowerCase();
        if (seen[k]) return false;
        seen[k] = true;
        return true;
      });

      /* Tri par date décroissante */
      all.sort(function(a,b){ return new Date(b.date||0) - new Date(a.date||0); });

      if (!all.length) {
        setStatus('<i class="fas fa-exclamation-triangle"></i> Aucun article récupéré – réessaie dans quelques secondes', 'err');
        grid.innerHTML =
          '<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:48px 0;">' +
          '<i class="fas fa-satellite-dish" style="font-size:2.5rem;opacity:.25;display:block;margin-bottom:16px"></i>' +
          '<strong>Flux temporairement inaccessibles</strong><br>' +
          '<span style="font-size:.85rem">Clique sur Actualiser ou vérifie ta connexion.</span></div>';
        if (btn) btn.classList.remove("spinning");
        return;
      }

      /* Affichage des cartes avec animation décalée */
      grid.innerHTML = "";
      all.slice(0, 12).forEach(function(item, i){
        var card = buildCard(item);
        card.style.cssText = "opacity:0;transform:translateY(22px);transition:opacity .45s ease " + (i*55) + "ms,transform .45s ease " + (i*55) + "ms";
        grid.appendChild(card);
        requestAnimationFrame(function(){
          requestAnimationFrame(function(){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        });
      });

      startTicker(all);
      veilleLoaded = true;
      if (btn) btn.classList.remove("spinning");
      setStatus(
        '<i class="fas fa-check-circle"></i> ' + all.length + ' articles · mis à jour à ' +
        new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),
        'ok'
      );
    });
  };

  /* ── Chargement immédiat dès le démarrage de la page ── */
  /* On lance en arrière-plan dès window.load, pas besoin de scroller */
  loadVeille(false);

  /* Retry automatique si 0 articles au bout de 4 s (réseau lent) */
  setTimeout(function() {
    if (!veilleLoaded) loadVeille(false);
  }, 4000);
});