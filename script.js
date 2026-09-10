const scenarios = {
  ipad: {
    zh: {
      quote: '“我想买一台 iPad 学习，选哪款？”',
      labels: ['先了解', '再比较', '最后确认'],
      steps: [
        '主要用来记笔记、阅读，还是会运行专业软件与进行创作？',
        '把屏幕、性能、便携性和配件支持，转化为与实际场景相关的取舍。',
        '结合已有设备、使用年限与预算，给出一到两个清晰选项。'
      ],
      result: '顾客知道自己为何选择，而不只是记住一串型号。'
    },
    en: {
      quote: '“I need an iPad for studying. Which one should I get?”',
      labels: ['Discover', 'Compare', 'Confirm'],
      steps: [
        'Is it mainly for notes and reading, or also professional apps and creative work?',
        'Translate display, performance, portability, and accessory support into real-life trade-offs.',
        'Use their current devices, expected lifespan, and budget to narrow it to one or two clear options.'
      ],
      result: 'The customer understands why the choice fits—not just the model name.'
    }
  },
  airpods: {
    zh: {
      quote: '“我每天通勤，AirPods 怎么选？”',
      labels: ['先了解', '再比较', '最后确认'],
      steps: [
        '通勤环境有多嘈杂？是否在意入耳感、长时间佩戴或运动稳定性？',
        '围绕降噪、佩戴方式、续航与使用设备解释差异，而不是堆叠术语。',
        '让顾客按自己的高频场景排序，确认最有价值的功能。'
      ],
      result: '把“哪款更贵”转化成“哪款更适合每天使用”。'
    },
    en: {
      quote: '“I commute every day. Which AirPods are right for me?”',
      labels: ['Discover', 'Compare', 'Confirm'],
      steps: [
        'How noisy is the commute, and how important are fit, long-wear comfort, or workout stability?',
        'Explain noise control, fit, battery, and device use without burying the customer in terminology.',
        'Let their most frequent scenario rank the features that create real value.'
      ],
      result: 'Shift the decision from “Which costs more?” to “Which fits every day?”'
    }
  },
  mac: {
    zh: {
      quote: '“这是我的第一台 Mac，我怕买错。”',
      labels: ['先了解', '再比较', '最后确认'],
      steps: [
        '了解工作流、常用软件、文件规模，以及是否经常携带出门。',
        '清楚说明性能、内存、存储与尺寸如何影响真实体验和使用年限。',
        '核对软件兼容与迁移顾虑，并说明下一步设置思路。'
      ],
      result: '减少第一次进入新生态的不确定感，让购买更安心。'
    },
    en: {
      quote: '“This is my first Mac, and I’m worried about choosing wrong.”',
      labels: ['Discover', 'Compare', 'Confirm'],
      steps: [
        'Understand the workflow, key apps, file sizes, and how often the computer needs to travel.',
        'Explain how performance, memory, storage, and size affect the real experience and useful lifespan.',
        'Check software compatibility and migration concerns, then clarify the next steps for setup.'
      ],
      result: 'Reduce the uncertainty of entering a new ecosystem and make the purchase feel considered.'
    }
  }
};

const root = document.documentElement;
const languageButtons = document.querySelectorAll('[data-set-lang]');
const scenarioTabs = document.querySelectorAll('[data-scenario]');
let activeScenario = 'ipad';

const scenarioElements = {
  quote: document.querySelector('#scenario-quote'),
  labels: [
    document.querySelector('#scenario-label-1'),
    document.querySelector('#scenario-label-2'),
    document.querySelector('#scenario-label-3')
  ],
  steps: [
    document.querySelector('#scenario-step-1'),
    document.querySelector('#scenario-step-2'),
    document.querySelector('#scenario-step-3')
  ],
  result: document.querySelector('#scenario-result')
};

function renderScenario() {
  const lang = root.dataset.lang || 'zh';
  const content = scenarios[activeScenario][lang];
  scenarioElements.quote.textContent = content.quote;
  scenarioElements.labels.forEach((element, index) => {
    element.textContent = content.labels[index];
  });
  scenarioElements.steps.forEach((element, index) => {
    element.textContent = content.steps[index];
  });
  scenarioElements.result.textContent = content.result;
}

function setLanguage(lang) {
  root.dataset.lang = lang;
  root.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.title = lang === 'zh'
    ? '刘炘烨 · Specialist Candidate'
    : 'Liu Xinye · Specialist Candidate';
  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLang === lang;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  try {
    localStorage.setItem('preferred-language', lang);
  } catch (_) {
    // Language selection still works when storage is unavailable.
  }
  renderScenario();
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.setLang));
});

scenarioTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    activeScenario = tab.dataset.scenario;
    scenarioTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    renderScenario();
  });
});

let savedLanguage = 'zh';
try {
  savedLanguage = localStorage.getItem('preferred-language') || 'zh';
} catch (_) {
  savedLanguage = 'zh';
}
setLanguage(savedLanguage === 'en' ? 'en' : 'zh');

document.querySelector('#year').textContent = new Date().getFullYear();

const backToTopButton = document.querySelector('#back-to-top');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateBackToTopVisibility() {
  backToTopButton.classList.toggle('is-visible', window.scrollY > 320);
}

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
  });
});

window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
