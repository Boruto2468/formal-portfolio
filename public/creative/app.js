/* KOMA — small, accessible interactions. No dependencies, no analytics or trackers. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const safeGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Private browsing may disallow storage. */ } };

  const copy = {
    en: {
      skip:'Skip to content',identitySubtitle:'CREATIVE DEVELOPER / 開発者',navWork:'Work',navProcess:'Process',navExpertise:'Expertise',navAbout:'About',navContact:'Contact',
      editionLabel:'AN EXERCISE IN CRAFT & CODE',heroEyebrow:'FRONTEND ENGINEER · CREATIVE DEVELOPER',
      heroLine1:'I build the',heroLine2:'thoughtful',heroLine3:'side of the web.',
      heroIntro:"I'm Jotham (Frank) Arimoro. I turn complicated ideas into clear, usable digital experiences—where solid engineering meets a slightly unconventional imagination.",
      viewWork:'Explore my work',getInTouch:"Let's talk",heroSignature:'Building for people, not just screens.',
      basedIn:'CURRENTLY BASED IN',primaryCraft:'PRIMARY CRAFT',beyondScreen:'BEYOND THE SCREEN',beyondText:'LANGUAGES · ANIME · EDUCATION',scrollLabel:'SCROLL TO EXPLORE',
      workHeading:'Work worth opening.',workIntro:'Not just pretty screenshots. Real projects, real product decisions, and the messy work in between.',
      yukotoDescription:'An evolving Chinese and Japanese learning platform with guided lessons, reading, speaking practice, and progress-aware experiences.',
      northstarDescription:'A structured learning application for Maths and Biology, built around lessons, interactive practice, and thoughtful question feedback.',
      visitProject:'Visit live project',readStory:'Read the story',illustrationNote:'Project artwork is an editorial interpretation of each product—not a captured screenshot. Open the live sites to see the interfaces in action.',browseGithub:'Browse GitHub',
      processHeading:'The work between<br><em>the frames.</em>',processIntro:'The parts that rarely make the screenshot: debugging, trade-offs, and making the experience reliable.',
      caseOneTitle:'When two languages collided.',caseOneText:'While developing Yukoto, language navigation could bounce Japanese learners back to the Chinese experience. That meant tracing route handling, shared state, and the flow between learning paths.',
      caseTwoTitle:'A question is more than its answer.',caseTwoText:"For Northstar, mismatched generated prompts and answers exposed the need to keep each question's parameters, solution, and feedback together—and test the resulting variations.",
      caseThreeTitle:'Making design survive reality.',caseThreeText:'Pixel-perfect desktop designs mean little if they fail on smaller screens. I work through layout, touch targets, performance, and motion until the interface behaves well—not just looks good.',
      quoteText:'Good design earns its place by working.',expertiseHeading:'Tools, tongue & taste.',expertiseIntro:'A practical toolkit, shaped by a curiosity that goes well beyond the browser.',
      stackHeading:'Things I build with.',skillCore:'CORE DEVELOPMENT',skillBackend:'BACKEND & INTEGRATIONS',skillCraft:'CRAFT & WORKFLOW',languageHeading:'More than one way to think.',native:'Native',fluent:'Fluent',intermediate:'Intermediate',
      languageNote:'Language changes how I understand people, and that changes how I build for them.',aboutHeading:"There's a human<br><em>behind the pixels.</em>",
      aboutTextOne:"I'm a Nigerian-Japanese developer who cares about how things work and how they feel. I enjoy bringing structure to complicated problems while making space for creativity.",
      aboutTextTwo:"Languages, teaching, anime, and gaming have all shaped the way I approach interactive products. They're not separate from engineering; they're part of why I pay attention to stories, systems, and the people using them.",
      interest1:'Japanese culture',interest2:'Language learning',interest3:'Anime & manga',interest4:'Games',interest5:'Teaching',downloadCv:'Download my CV',
      contactHeading:"Let's make<br><em>something matter.</em>",contactText:"Whether it's a product, a collaboration, or a challenging problem worth solving—I'd love to hear about it.",
      emailMe:'Send an email',copyEmail:'Copy email',footerCredit:'DESIGNED & BUILT WITH CARE',backTop:'BACK TO TOP ↑',
      copied:'Email copied: frankarimoro@gmail.com',copyFallback:'Select and copy: frankarimoro@gmail.com',
      closeDetails:'Close project details',dialogChallengeLabel:'The challenge',dialogWorkLabel:'My contribution',dialogStackLabel:'Tools & technologies',dialogVisit:'Visit live site ↗',
      navOpen:'Open menu',navClose:'Close menu',darkSwitch:'Switch to ink theme',lightSwitch:'Switch to paper theme'
    },
    ja: {
      skip:'本文へ移動',identitySubtitle:'クリエイティブ・デベロッパー',navWork:'作品',navProcess:'制作過程',navExpertise:'技術',navAbout:'自己紹介',navContact:'連絡',
      editionLabel:'デザインとコードの実験',heroEyebrow:'フロントエンドエンジニア · 開発者',
      heroLine1:'考え抜いた',heroLine2:'デザインを',heroLine3:'コードで形に。',
      heroIntro:'ジョサム（フランク）・アリモロです。複雑なアイデアを、わかりやすく使いやすい体験へ。確かな技術と、少し自由な発想を大切にしています。',
      viewWork:'作品を見る',getInTouch:'話してみる',heroSignature:'画面の向こうにいる人のために。',
      basedIn:'現在の拠点',primaryCraft:'主な専門分野',beyondScreen:'コードの外では',beyondText:'言語 · アニメ · 教育',scrollLabel:'下へスクロール',
      workHeading:'開いてみたくなる作品。',workIntro:'見た目だけではなく、実際の開発、設計上の判断、試行錯誤も紹介します。',
      yukotoDescription:'中国語と日本語の学習プラットフォーム。ガイド付きレッスン、読解、発話練習、学習進捗を考慮した体験を開発しています。',
      northstarDescription:'数学と生物を学ぶための教育アプリ。体系的な授業、演習、問題へのフィードバックを中心に設計しています。',
      visitProject:'公開サイトを見る',readStory:'制作の背景',illustrationNote:'作品画像はイメージ表現であり、実際の画面キャプチャではありません。公開サイトで動作をご確認ください。',browseGithub:'GitHubを見る',
      processHeading:'画面の裏にある<br><em>仕事の話。</em>',processIntro:'デバッグ、設計上の選択、信頼性の改善。スクリーンショットには写らない大切な工程です。',
      caseOneTitle:'二つの言語がすれ違った時。',caseOneText:'Yukotoの開発中、日本語ページから中国語の画面に戻ってしまう不具合がありました。ルーティング、共有状態、学習経路を追いながら原因を調査しました。',
      caseTwoTitle:'問題は答えだけではない。',caseTwoText:'Northstarでは自動生成された設問と答えの不一致が課題に。パラメータ、解法、フィードバックを同じ問題データで管理し、生成パターンを検証する重要性を学びました。',
      caseThreeTitle:'デザインを実用の中で生かす。',caseThreeText:'デスクトップで美しくても、小さな画面で崩れては意味がありません。レイアウト、操作領域、速度、動きを調整し、使いやすさを大切にしています。',
      quoteText:'使いやすさが、デザインの価値を証明する。',expertiseHeading:'技術、言葉、そして感性。',expertiseIntro:'ブラウザーの外にも広がる好奇心が、開発の道具を豊かにしてくれます。',
      stackHeading:'日々使っている技術。',skillCore:'フロントエンド開発',skillBackend:'バックエンドと連携',skillCraft:'デザイン・開発工程',languageHeading:'言葉が増えると、視点も増える。',native:'母語',fluent:'流暢',intermediate:'中級',
      languageNote:'言葉を学ぶことで人への理解が深まり、プロダクトの作り方も変わります。',aboutHeading:'ピクセルの向こうに<br><em>一人の人間がいる。</em>',
      aboutTextOne:'ナイジェリアと日本にルーツを持つ開発者です。仕組みの正確さだけでなく、触れた時の心地よさも大切にしています。複雑な課題を整理し、創造性を忘れずに向き合います。',
      aboutTextTwo:'言語学習、教育、アニメ、ゲーム。こうした関心は開発とは別物ではなく、物語や仕組み、そして使う人を意識する理由の一部です。',
      interest1:'日本文化',interest2:'言語学習',interest3:'アニメ・漫画',interest4:'ゲーム',interest5:'教育',downloadCv:'履歴書をダウンロード',
      contactHeading:'心に残るものを、<br><em>一緒につくろう。</em>',contactText:'プロダクト、共同制作、解決したい課題など。ぜひお話を聞かせてください。',
      emailMe:'メールを送る',copyEmail:'アドレスをコピー',footerCredit:'丁寧に設計・制作しました',backTop:'ページの先頭へ ↑',
      copied:'コピーしました: frankarimoro@gmail.com',copyFallback:'コピーしてください: frankarimoro@gmail.com',
      closeDetails:'詳細を閉じる',dialogChallengeLabel:'課題',dialogWorkLabel:'担当したこと',dialogStackLabel:'使用技術',dialogVisit:'公開サイトを見る ↗',
      navOpen:'メニューを開く',navClose:'メニューを閉じる',darkSwitch:'墨色モードに切り替える',lightSwitch:'和紙モードに切り替える'
    }
  };
  // HTML is confined to three authored heading translations; all other translations use textContent.
  const headingKeys = new Set(['processHeading','aboutHeading','contactHeading']);

  const caseStudies = {
    yukoto: {
      url:'https://yukoto.download',title:'Yukoto / 言語',stack:'JavaScript · Cloudflare Workers · Firebase · APIs · Web UI',
      en: {kicker:'CASE STUDY 01 / PERSONAL PRODUCT',intro:'A multilingual, practice-first learning product for Chinese and Japanese.',challenge:'Learning flows, language-specific navigation, vocabulary data, and state persistence have to work together without taking students to the wrong track. A particular issue sent Japanese learners back toward the Chinese experience.',contribution:'Designed and iterated on responsive learning interfaces, guided vocabulary and practice flows, language-specific routing, tests, deployments, and backend/API integration experiments—including ongoing conversational tutoring work.'},
      ja: {kicker:'制作事例 01 / 個人プロジェクト',intro:'中国語と日本語のための、実践を大切にした学習アプリ。',challenge:'言語別の画面遷移、単語データ、進捗保存を連携させることが必要です。日本語から中国語へ戻ってしまう不具合も調査しました。',contribution:'レスポンシブな学習画面、単語・練習の流れ、言語ごとのナビゲーション、テスト、デプロイ、API連携などを開発・改善しています。会話練習の連携も継続して検討しています。'}
    },
    northstar: {
      url:'https://northstar-academy-rosy.vercel.app/',title:'Northstar Academy / 学習',stack:'Next.js · TypeScript · Tailwind CSS · React · Testing',
      en: {kicker:'CASE STUDY 02 / EDUCATION PLATFORM',intro:'An interactive learning experience built around structured Maths and Biology content.',challenge:'Generated exercises need to stay consistent even when parameters vary or the student reloads a question. Misaligned prompts, answers, and explanations can break trust in the learning experience.',contribution:'Worked on the React/Next.js learning interface, curriculum-led topic navigation, practice experiences, question generation design, review flows, debugging, and testing considerations for variable question templates.'},
      ja: {kicker:'制作事例 02 / 教育アプリ',intro:'数学と生物を体系的に学べる、インタラクティブな学習体験。',challenge:'問題の生成条件が変化しても、設問・答え・解説の整合性を守る必要があります。表示内容と正答のずれが学習体験の信頼性を損なう課題でした。',contribution:'React/Next.jsの画面、カリキュラム順のナビゲーション、演習、問題生成の構造、復習機能、デバッグとテスト設計に取り組みました。'}
    }
  };

  let lang = safeGet('koma-language') === 'ja' ? 'ja' : 'en';
  const theme = safeGet('koma-theme') === 'ink' ? 'ink' : 'paper';
  root.dataset.theme = theme;

  function applyLanguage(value) {
    lang = value === 'ja' ? 'ja' : 'en';
    root.lang = lang;
    document.title = lang === 'ja' ? 'ジョサム・アリモロ — クリエイティブ開発者' : 'Jotham Arimoro — Creative Developer / 創る';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(copy[lang], key)) {
        if (headingKeys.has(key)) el.innerHTML = copy[lang][key];
        else el.textContent = copy[lang][key];
      }
    });
    for (const [code, button] of [['en',byId('langEN')],['ja',byId('langJA')]]) {
      button.classList.toggle('is-active',code === lang);
      button.setAttribute('aria-pressed',String(code === lang));
    }
    byId('copyFeedback').textContent = '';
    byId('closeDialog').setAttribute('aria-label',copy[lang].closeDetails);
    byId('dialogChallengeLabel').textContent = copy[lang].dialogChallengeLabel;
    byId('dialogWorkLabel').textContent = copy[lang].dialogWorkLabel;
    byId('dialogStackLabel').textContent = copy[lang].dialogStackLabel;
    byId('dialogVisit').textContent = copy[lang].dialogVisit;
    updateButtonLabels();
    if (byId('projectDialog').open) populateDialog(byId('projectDialog').dataset.project);
    safeSet('koma-language',lang);
  }
  function updateButtonLabels() {
    const currentTheme = root.dataset.theme;
    const label = currentTheme === 'ink' ? copy[lang].lightSwitch : copy[lang].darkSwitch;
    byId('themeButton').setAttribute('aria-label',label);
    byId('themeButton').setAttribute('title',label);
    byId('themeIcon').textContent = currentTheme === 'ink' ? '☼' : '◐';
    const menuOpen = byId('menuButton').getAttribute('aria-expanded') === 'true';
    byId('menuButton').setAttribute('aria-label', menuOpen ? copy[lang].navClose : copy[lang].navOpen);
  }
  byId('langEN').addEventListener('click',() => applyLanguage('en'));
  byId('langJA').addEventListener('click',() => applyLanguage('ja'));
  byId('themeButton').addEventListener('click',() => {
    root.dataset.theme = root.dataset.theme === 'paper' ? 'ink' : 'paper';
    document.querySelector('meta[name="theme-color"]').content = root.dataset.theme === 'ink' ? '#151514' : '#eee6d8';
    safeSet('koma-theme',root.dataset.theme);
    updateButtonLabels();
  });

  function closeMenu() {
    const menu = byId('mobileNav');
    menu.hidden = true;
    byId('menuButton').setAttribute('aria-expanded','false');
    updateButtonLabels();
  }
  byId('menuButton').addEventListener('click',() => {
    const menu = byId('mobileNav');
    menu.hidden = !menu.hidden;
    byId('menuButton').setAttribute('aria-expanded',String(!menu.hidden));
    updateButtonLabels();
  });
  byId('mobileNav').querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && !byId('mobileNav').hidden) { closeMenu(); byId('menuButton').focus(); }
  });
  document.addEventListener('click',event => {
    if (!byId('mobileNav').hidden && !byId('header').contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 851px)').addEventListener('change',e => { if (e.matches) closeMenu(); });

  function populateDialog(id) {
    const project = caseStudies[id];
    if (!project) return;
    const content = project[lang];
    byId('dialogKicker').textContent = content.kicker;
    byId('dialogTitle').textContent = project.title;
    byId('dialogIntro').textContent = content.intro;
    byId('dialogChallenge').textContent = content.challenge;
    byId('dialogWork').textContent = content.contribution;
    byId('dialogStack').textContent = project.stack;
    byId('dialogVisit').href = project.url;
  }
  const dialog = byId('projectDialog');
  document.querySelectorAll('.project-detail').forEach(button => button.addEventListener('click',() => {
    dialog.dataset.project = button.dataset.project;
    populateDialog(button.dataset.project);
    if (!dialog.open) dialog.showModal();
  }));
  byId('closeDialog').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => { if (event.target === dialog) dialog.close(); });

  const email = 'frankarimoro@gmail.com';
  byId('copyEmail').addEventListener('click',async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      byId('copyFeedback').textContent = copy[lang].copied;
    } catch {
      byId('copyFeedback').textContent = copy[lang].copyFallback;
    }
  });
  byId('year').textContent = String(new Date().getFullYear());

  const progress = byId('readingProgress');
  let scrollTicking = false;
  function updateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? Math.min(1,window.scrollY/maxScroll) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    scrollTicking = false;
  }
  window.addEventListener('scroll',() => {
    if (!scrollTicking) { requestAnimationFrame(updateScrollProgress); scrollTicking = true; }
  },{passive:true});
  updateScrollProgress();

  if ('IntersectionObserver' in window) {
    root.classList.add('js-enhanced');
    const reveal = new IntersectionObserver((entries,observer) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }),{threshold:.08,rootMargin:'0px 0px 45px 0px'});
    document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.toggle('is-current',a.hash === '#'+entry.target.id));
      });
    },{rootMargin:'-15% 0px -70% 0px'});
    document.querySelectorAll('#work,#process,#expertise,#about,#contact').forEach(el=>navObserver.observe(el));
  }
  applyLanguage(lang);

  // Offline service-worker registration is intentionally disabled in dual-mode builds.
  // The creative experience lives under /creative/ beside the Next.js formal site.
})();
