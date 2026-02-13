let translations = {};


// ======================
// LANGUAGES
// ======================

async function loadTranslations(){
  const res = await fetch("translations.json");
  translations = await res.json();

  const savedLang = localStorage.getItem("lang") || "ru";
  setLanguage(savedLang);
}

function setLanguage(lang){
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if(translations[lang] && translations[lang][key]){
      el.innerHTML = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);

    const flagMap = {
    ru: "images/flags/ru.svg",
    en: "images/flags/en.svg",
    ka: "images/flags/ge.svg",
    ua: "images/flags/ua.svg"
    };

    document.getElementById("langToggle").innerHTML = `<img src="${flagMap[lang]}" />`;
}

function initLanguageSwitcher(){
  document.getElementById("langToggle").addEventListener("click", () => {
    document.getElementById("langOptions").classList.toggle("open");
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      document.getElementById("langOptions").classList.remove("open");
    });
  });
}


// ======================
// TABS MENU
// ======================

function initMenuTabs(){

    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".menu-section");

    tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // активная кнопка
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.target;

        // показать нужную секцию
        sections.forEach(section => {
        if(section.dataset.category === target){
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
        });

        // скролл вверх к меню
        window.scrollTo({
        top: document.querySelector(".menu").offsetTop - 10,
        behavior: "smooth"
        });

    });
    });

    // открыть первую вкладку по умолчанию
    if(tabs.length){
        tabs[0].click();
    }

}


// ======================
// INIT
// ======================

document.addEventListener("DOMContentLoaded", () => {

  loadTranslations();
  initLanguageSwitcher();
  initMenuTabs();

});
