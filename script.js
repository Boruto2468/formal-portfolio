const reveals = document.querySelectorAll('.reveal');
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navBackdrop = document.querySelector('.nav-backdrop');
const navClose = document.querySelector('.nav-close');
const navLinks = document.querySelectorAll('.nav a');
const themeToggle = document.querySelector('.theme-toggle');
const langParam = new URLSearchParams(window.location.search).get('lang') || 'en';

const translations = {
  en: {
    title: 'Frank Arimoro | Full-Stack Development & AI Workflow Consulting',
    hero: {
      eyebrow: 'Multilingual full-stack delivery for modern teams',
      title: 'Reliable digital systems that help international businesses move with clarity.',
      description: 'I design and ship polished web platforms, API integrations, and AI-assisted workflows that reduce friction across operations, customer experience, and growth.',
      primaryCta: 'Book a Consultation',
      secondaryCta: 'Review Selected Work',
      highlight1: 'Corporate-grade web applications',
      highlight2: 'Automations for cross-border operations',
      highlight3: 'AI workflows tailored to multilingual teams'
    },
    services: {
      eyebrow: 'Services',
      heading: 'Structured support for products, operations, and growth.',
      card1: { title: 'Custom Web Development', description: 'Responsive, maintainable frontends and robust backends for client portals, internal tools, and B2B platforms.' },
      card2: { title: 'API & Automation', description: 'Flexible integrations between CRM, ERP, analytics, and communications systems to remove manual effort.' },
      card3: { title: 'AI Workflow Integration', description: 'Practical AI systems for summarization, support routing, content orchestration, and knowledge access.' }
    },
    nav: {
      open: 'Open navigation',
      close: 'Close navigation',
      services: 'Services',
      caseStudies: 'Case Studies',
      about: 'About',
      contact: 'Contact'
    },
    caseStudies: {
      eyebrow: 'Case Studies',
      heading: 'Outcome-led delivery for ambitious teams and cross-border operations.',
      card1: {
        title: 'Regional Client Portal',
        problemLabel: 'Problem',
        problem: 'A multilingual service team needed a single portal for case management and reporting.',
        approachLabel: 'Approach',
        approach: 'I built a structured web application with localized content, role-based access, and secure API connectors.',
        resultLabel: 'Result',
        result: 'Response times improved by 40% and regional teams gained a clearer operating view.'
      },
      card2: {
        title: 'AI Support Assistant',
        problemLabel: 'Problem',
        problem: 'Support teams were losing time to repetitive requests and fragmented knowledge.',
        approachLabel: 'Approach',
        approach: 'I introduced a workflow that routed inquiries, summarized prior context, and surfaced approved answers.',
        resultLabel: 'Result',
        result: 'Ticket handling became faster and more consistent for international customers.'
      },
      card3: {
        title: 'Operations Automation Suite',
        problemLabel: 'Problem',
        problem: 'Manual handoffs between sales, finance, and delivery slowed expansion into new markets.',
        approachLabel: 'Approach',
        approach: 'I connected core systems and created automated notifications, approvals, and reporting steps.',
        resultLabel: 'Result',
        result: 'The team reduced process overhead and gained better visibility across the chain.'
      }
    },
    about: {
      eyebrow: 'About',
      heading: 'A technical partner for teams that value precision, clarity, and long-term maintenance.',
      paragraph1: 'I work best as a quiet extension of leadership, product, and operations teams. My role is to translate complexity into dependable systems, with clear communication across technical and non-technical stakeholders.',
      paragraph2: 'I support clients in English, Japanese, French, and Mandarin, which helps reduce friction in cross-border collaboration and international delivery.'
    },
    languages: {
      heading: 'Multilingual profile',
      english: 'English',
      japanese: '日本語',
      french: 'Français',
      chinese: '中文'
    },
    contact: {
      eyebrow: 'Let\'s work together',
      heading: 'Start with a structured conversation about your next initiative.',
      description: 'Whether you need a new platform, an AI-enabled workflow, or a more reliable operating layer, I can help you assess the right path.',
      link: 'Reach out to me'
    },
    footer: { text: '© {year} Frank Arimoro. Structured digital delivery for international business.' }
  },
  ja: {
    title: 'フランクアリモロ | フルスタック開発とAIワークフローコンサルティング',
    hero: {
      eyebrow: '多言語対応のフルスタック提供',
      title: '国際的なビジネスが明確に進められる、信頼性の高いデジタルシステム。',
      description: '運用、顧客体験、成長のあいだにある摩擦を減らすため、洗練されたWebプラットフォーム、API統合、AI支援ワークフローを設計・実装します。',
      primaryCta: '相談を予約する',
      secondaryCta: '実績を見る',
      highlight1: '企業向けの高品質なWebアプリケーション',
      highlight2: '国際的な業務の自動化',
      highlight3: '多言語チーム向けのAIワークフロー'
    },
    services: {
      eyebrow: 'サービス',
      heading: '製品、運用、成長を支える構造化された支援。',
      card1: { title: 'カスタムWeb開発', description: 'クライアントポータル、社内ツール、B2Bプラットフォーム向けの、保守しやすく応答性の高いフロントエンドと堅牢なバックエンド。' },
      card2: { title: 'APIと自動化', description: 'CRM、ERP、分析、通信システム間の柔軟な統合により、手作業を減らします。' },
      card3: { title: 'AIワークフロー統合', description: '要約、サポートルーティング、コンテンツオーケストレーション、ナレッジアクセス向けの実用的なAIシステム。' }
    },
    nav: {
      open: 'Open navigation',
      close: 'Close navigation',
      services: 'サービス',
      caseStudies: '事例',
      about: 'について',
      contact: 'お問い合わせ'
    },
    caseStudies: {
      eyebrow: '事例',
      heading: '雄心あるチームと国境を越える運用のための成果重視の提供。',
      card1: {
        title: '地域クライアントポータル',
        problemLabel: '問題',
        problem: '多言語サービスチームは、案件管理とレポートのための単一ポータルを必要としていました。',
        approachLabel: 'アプローチ',
        approach: 'ローカライズされたコンテンツ、役割ベースのアクセス、セキュアなAPIコネクタを備えた構造化されたWebアプリケーションを構築しました。',
        resultLabel: '結果',
        result: '応答時間が40%改善され、地域チームはより明確な運用ビューを得ました。'
      },
      card2: {
        title: 'AIサポートアシスタント',
        problemLabel: '問題',
        problem: 'サポートチームは、反復的なリクエストと断片化したナレッジに時間を失っていました。',
        approachLabel: 'アプローチ',
        approach: '問い合わせをルーティングし、前のコンテキストを要約し、承認済みの回答を提示するワークフローを導入しました。',
        resultLabel: '結果',
        result: 'チケット対応が迅速かつ一貫性のあるものになりました。'
      },
      card3: {
        title: 'オペレーション自動化スイート',
        problemLabel: '問題',
        problem: '営業、財務、デリバリー間の手動による引き継ぎが新市場への拡大を遅らせていました。',
        approachLabel: 'アプローチ',
        approach: '中核システムを接続し、自動通知、承認、および報告フローを作成しました。',
        resultLabel: '結果',
        result: 'チームはプロセスの負担を軽減し、全体の可視性を向上させました。'
      }
    },
    about: {
      eyebrow: 'について',
      heading: '精密さ、明快さ、長期的な保守性を重視するチームのための技術パートナー。',
      paragraph1: '私は、リーダーシップ、プロダクト、運用チームの静かな拡張として最も力を発揮します。複雑さを信頼できるシステムへと変換し、技術者と非技術者の双方に明確に伝える役割を担います。',
      paragraph2: '英語、日本語、フランス語、中国語で支援し、国境をまたぐ協働と国際的な提供の摩擦を減らします。'
    },
    languages: {
      heading: '多言語プロフィール',
      english: '英語',
      japanese: '日本語',
      french: 'フランス語',
      chinese: '中国語'
    },
    contact: {
      eyebrow: '一緒に取り組みましょう',
      heading: '次の取り組みについて、構造化された会話から始めましょう。',
      description: '新しいプラットフォーム、AI対応のワークフロー、より信頼性の高い運用基盤が必要な場合でも、適切な道筋を一緒に整理できます。',
      link: 'お問い合わせする'
    },
    footer: { text: '© {year} Frank Arimoro。国際ビジネス向けの構造化されたデジタル提供。' }
  },
  fr: {
    title: 'Frank Arimoro | Développement full-stack et conseil en workflows IA',
    hero: {
      eyebrow: 'Livraison full-stack multilingue pour les équipes modernes',
      title: 'Des systèmes numériques fiables qui aident les entreprises internationales à avancer avec clarté.',
      description: 'Je conçois et livre des plateformes web soignées, des intégrations API et des workflows assistés par IA pour réduire les frictions dans les opérations, l’expérience client et la croissance.',
      primaryCta: 'Prendre un rendez-vous',
      secondaryCta: 'Voir les réalisations',
      highlight1: 'Applications web de qualité entreprise',
      highlight2: 'Automatisations pour les opérations transfrontalières',
      highlight3: 'Workflows IA adaptés aux équipes multilingues'
    },
    services: {
      eyebrow: 'Services',
      heading: 'Un accompagnement structuré pour les produits, les opérations et la croissance.',
      card1: { title: 'Développement web sur mesure', description: 'Des interfaces frontales maintenables et des backends robustes pour les portails clients, les outils internes et les plateformes B2B.' },
      card2: { title: 'API & automatisation', description: 'Des intégrations flexibles entre CRM, ERP, analytics et systèmes de communication pour supprimer les tâches manuelles.' },
      card3: { title: 'Intégration de workflows IA', description: 'Des systèmes IA concrets pour la synthèse, l’acheminement du support, l’orchestration de contenu et l’accès aux connaissances.' }
    },
    nav: {
      open: 'Open navigation',
      close: 'Close navigation',
      services: 'Services',
      caseStudies: 'Études de cas',
      about: 'À propos',
      contact: 'Contact'
    },
    caseStudies: {
      eyebrow: 'Études de cas',
      heading: 'Une livraison orientée résultats pour des équipes ambitieuses et des opérations internationales.',
      card1: {
        title: 'Portail client régional',
        problemLabel: 'Problème',
        problem: 'Une équipe de service multilingue avait besoin d’un portail unique pour la gestion de cas et les rapports.',
        approachLabel: 'Approche',
        approach: 'J’ai construit une application web structurée avec un contenu localisé, un accès par rôle et des connecteurs API sécurisés.',
        resultLabel: 'Résultat',
        result: 'Les délais de réponse se sont améliorés de 40 % et les équipes régionales ont gagné une meilleure visibilité opérationnelle.'
      },
      card2: {
        title: 'Assistant de support IA',
        problemLabel: 'Problème',
        problem: 'Les équipes de support perdaient du temps avec des demandes répétitives et des connaissances fragmentées.',
        approachLabel: 'Approche',
        approach: 'J’ai mis en place un workflow qui a routé les demandes, résumé le contexte précédent et affiché des réponses approuvées.',
        resultLabel: 'Résultat',
        result: 'Le traitement des tickets est devenu plus rapide et plus uniforme pour les clients internationaux.'
      },
      card3: {
        title: 'Suite d’automatisation des opérations',
        problemLabel: 'Problème',
        problem: 'Les transitions manuelles entre les ventes, la finance et la livraison ralentissaient l’expansion vers de nouveaux marchés.',
        approachLabel: 'Approche',
        approach: 'J’ai relié les systèmes principaux et créé des notifications, approbations et rapports automatisés.',
        resultLabel: 'Résultat',
        result: 'L’équipe a réduit les charges de processus et gagné en visibilité sur l’ensemble de la chaîne.'
      }
    },
    about: {
      eyebrow: 'À propos',
      heading: 'Un partenaire technique pour les équipes qui privilégient la précision, la clarté et la maintenance à long terme.',
      paragraph1: 'Je fonctionne le mieux comme une extension discrète des équipes de direction, produit et opérations. Mon rôle consiste à transformer la complexité en systèmes fiables, avec une communication claire entre les parties prenantes techniques et non techniques.',
      paragraph2: 'Je soutiens les clients en anglais, japonais, français et mandarin, ce qui réduit les frictions dans la collaboration transfrontalière et la livraison internationale.'
    },
    languages: {
      heading: 'Profil multilingue',
      english: 'Anglais',
      japanese: 'Japonais',
      french: 'Français',
      chinese: 'Chinois'
    },
    contact: {
      eyebrow: 'Travaillons ensemble',
      heading: 'Commencez par une conversation structurée autour de votre prochaine initiative.',
      description: 'Que vous ayez besoin d’une nouvelle plateforme, d’un workflow alimenté par l’IA ou d’une couche opérationnelle plus fiable, je peux vous aider à définir la bonne voie.',
      link: 'Prenez contact avec moi'
    },
    footer: { text: '© {year} Frank Arimoro. Livraison digitale structurée pour les affaires internationales.' }
  },
  zh: {
    title: 'Frank Arimoro | 全栈开发与AI工作流咨询',
    hero: {
      eyebrow: '面向现代团队的多语言全栈交付',
      title: '帮助国际业务清晰推进的可靠数字系统。',
      description: '我设计并交付精致的网页平台、API集成和AI辅助工作流，减少运营、客户体验和增长中的摩擦。',
      primaryCta: '预约咨询',
      secondaryCta: '查看精选作品',
      highlight1: '企业级网页应用',
      highlight2: '跨境运营自动化',
      highlight3: '为多语言团队量身定制的AI工作流'
    },
    services: {
      eyebrow: '服务',
      heading: '为产品、运营和增长提供结构化支持。',
      card1: { title: '定制网站开发', description: '为客户门户、内部工具和B2B平台提供可维护、响应迅速的前端以及稳健的后端。' },
      card2: { title: 'API与自动化', description: '在CRM、ERP、分析和通信系统之间实现灵活集成，减少手工操作。' },
      card3: { title: 'AI工作流集成', description: '用于摘要、支持路由、内容编排和知识访问的实用AI系统。' }
    },
    nav: {
      open: 'Open navigation',
      close: 'Close navigation',
      services: '服务',
      caseStudies: '案例研究',
      about: '关于',
      contact: '联系'
    },
    caseStudies: {
      eyebrow: '案例研究',
      heading: '面向雄心勃勃的团队和跨境运营的成果导向交付。',
      card1: {
        title: '区域客户端门户',
        problemLabel: '问题',
        problem: '多语言服务团队需要一个用于案件管理和报告的统一门户。',
        approachLabel: '方法',
        approach: '我构建了一个结构化的网页应用，包含本地化内容、基于角色的访问权限和安全的API连接器。',
        resultLabel: '结果',
        result: '响应时间提高了40%，区域团队获得了更清晰的运营视图。'
      },
      card2: {
        title: 'AI支持助手',
        problemLabel: '问题',
        problem: '支持团队因重复请求和知识碎片化而浪费时间。',
        approachLabel: '方法',
        approach: '我引入了一个工作流，将询问进行路由，汇总先前上下文，并展示已批准答案。',
        resultLabel: '结果',
        result: '工单处理变得更加快速且对国际客户更一致。'
      },
      card3: {
        title: '运营自动化套件',
        problemLabel: '问题',
        problem: '销售、财务和交付之间的手动交接拖慢了进入新市场的步伐。',
        approachLabel: '方法',
        approach: '我连接了核心系统，并创建了自动通知、审批和报告步骤。',
        resultLabel: '结果',
        result: '团队减少了流程开销，并提高了整个链条的可见性。'
      }
    },
    about: {
      eyebrow: '关于',
      heading: '为重视精准、清晰和长期维护的团队提供技术合作伙伴。',
      paragraph1: '我最擅长做领导层、产品和运营团队的静默合作伙伴。我的职责是把复杂问题转化为可靠系统，并在技术与非技术利益相关者之间建立清晰沟通。',
      paragraph2: '我以英语、日本语、法语和中文支持客户，这有助于降低跨境协作和国际交付中的摩擦。'
    },
    languages: {
      heading: '多语言简介',
      english: '英语',
      japanese: '日语',
      french: '法语',
      chinese: '中文'
    },
    contact: {
      eyebrow: '让我们一起工作',
      heading: '从一次围绕下一项计划的结构化对话开始。',
      description: '无论您需要新平台、AI驱动工作流还是更可靠的运营层，我都可以帮助您评估合适的路径。',
      link: '联系我'
    },
    footer: { text: '© {year} Frank Arimoro。面向国际业务的结构化数字交付。' }
  }
};

const getNestedValue = (source, path) => path.split('.').reduce((current, key) => current?.[key], source);

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch (error) {
    return 'dark';
  }

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  const isLight = theme === 'light';
  themeToggle?.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggle?.setAttribute('aria-pressed', String(isLight));
};

const applyTranslations = () => {
  const lang = translations[langParam] ? langParam : 'en';
  document.documentElement.lang = lang;
  document.title = translations[lang].title;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = getNestedValue(translations[lang], node.getAttribute('data-i18n'));
    if (!value) return;
    const attr = node.getAttribute('data-i18n-attr');
    if (attr) {
      node.setAttribute(attr, value);
    } else {
      node.textContent = value;
    }
  });

  const footerText = document.querySelector('[data-i18n="footer.text"]');
  if (footerText) {
    footerText.innerHTML = translations[lang].footer.text.replace('{year}', `<span id="year"></span>`);
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
};

const closeNav = () => {
  document.body.classList.remove('nav-open');
  nav?.classList.remove('is-open');
  navBackdrop?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

const toggleNav = () => {
  const isOpen = document.body.classList.toggle('nav-open');
  nav?.classList.toggle('is-open', isOpen);
  navBackdrop?.classList.toggle('is-open', isOpen);
  navToggle?.setAttribute('aria-expanded', String(isOpen));
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

applyTheme(getInitialTheme());
applyTranslations();
reveals.forEach((element) => revealObserver.observe(element));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
  try {
    localStorage.setItem('portfolio-theme', nextTheme);
  } catch (error) {
    return;
  }
});

navToggle?.addEventListener('click', toggleNav);
navClose?.addEventListener('click', closeNav);
navBackdrop?.addEventListener('click', closeNav);
navLinks.forEach((link) => link.addEventListener('click', closeNav));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNav();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeNav();
  }
});
