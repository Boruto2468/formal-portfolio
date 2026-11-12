'use client';

import { useEffect } from 'react';

type ProjectKey = 'yukoto' | 'northstar';
interface ProjectDetail {
  title: string;
  eyebrow: string;
  intro: string;
  challenge: string;
  contribution: string;
  tech: string;
  url: string;
}

const projects: Record<ProjectKey, ProjectDetail> = {
  yukoto: {
    title: 'Yukoto',
    eyebrow: '01 / INDEPENDENT PRODUCT',
    intro: 'Yukoto is a multilingual learning site built around real practice: vocabulary, reading, speaking, guided study, and separate experiences for Chinese and Japanese learners.',
    challenge: 'A language-learning application has to keep navigation, datasets, study flows, and learner state consistent. During development, Japanese navigation sometimes led learners back into the Chinese experience.',
    contribution: 'I designed and built the responsive frontend, structured learning views, language navigation and practice flows, and worked on integrations, testing, deployment, and debugging across the product.',
    tech: 'JavaScript, responsive UI, Firebase, Cloudflare Workers, API integrations, guided learning flows and browser testing.',
    url: 'https://yukoto.download',
  },
  northstar: {
    title: 'Northstar Academy',
    eyebrow: '02 / EDUCATION PLATFORM',
    intro: 'A Maths and Biology learning application with curriculum-ordered lessons, guided practice, and interactive questions for students.',
    challenge: 'Generated practice needs to keep every prompt, answer, hint, and explanation aligned. Problems become particularly visible when questions change on reload or use varying parameters.',
    contribution: 'I worked on the React/Next.js frontend, subject and topic navigation, learning and practice screens, question-generation structure, review flows, and debugging and testing strategies.',
    tech: 'Next.js, React, TypeScript, Tailwind CSS, curriculum data, interactive exercises, and testing.',
    url: 'https://northstar-academy-rosy.vercel.app/',
  },
};

/** Hydrates the existing portfolio's minimal interactions; all handlers are removed on unmount. */
export default function PortfolioBehaviour() {
  useEffect(() => {
    const byId = (id: string) => document.getElementById(id);
    const menu = byId('menuToggle') as HTMLButtonElement | null;
    const navLinks = byId('navLinks');
    const dialog = byId('caseDialog') as HTMLDialogElement | null;
    const closeDialog = byId('closeDialog') as HTMLButtonElement | null;
    const copyButton = byId('copyEmail') as HTMLButtonElement | null;
    const copyStatus = byId('copyStatus');
    const year = byId('year');
    const opener = { current: null as HTMLButtonElement | null };
    const teardown: Array<() => void> = [];
    const listen = <T extends EventTarget>(target: T | null, type: string, callback: EventListenerOrEventListenerObject) => {
      if (!target) return;
      target.addEventListener(type, callback);
      teardown.push(() => target.removeEventListener(type, callback));
    };
    const closeMenu = () => {
      navLinks?.classList.remove('is-open');
      menu?.setAttribute('aria-expanded', 'false');
      menu?.setAttribute('aria-label', 'Open navigation');
    };
    listen(menu, 'click', () => {
      const open = navLinks?.classList.toggle('is-open') ?? false;
      menu?.setAttribute('aria-expanded', String(open));
      menu?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    navLinks?.querySelectorAll('a').forEach(anchor => listen(anchor, 'click', closeMenu));
    listen(document, 'keydown', event => {
      if ((event as KeyboardEvent).key === 'Escape') closeMenu();
    });
    listen(document, 'click', event => {
      if (!menu?.contains(event.target as Node) && !navLinks?.contains(event.target as Node)) closeMenu();
    });

    const navAnchors = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
    const navSections = navAnchors.map(link => byId(link.dataset.nav ?? '')).filter((el): el is HTMLElement => !!el);
    const navObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(anchor => {
          const active = anchor.dataset.nav === entry.target.id;
          anchor.classList.toggle('is-active', active);
          if (active) anchor.setAttribute('aria-current', 'location');
          else anchor.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-14% 0px -68% 0px', threshold: 0 });
    navSections.forEach(section => navObserver?.observe(section));
    teardown.push(() => navObserver?.disconnect());

    const setText = (id: string, value: string) => {
      const node = byId(id);
      if (node) node.textContent = value;
    };
    const openCase = (key: string | undefined, trigger: HTMLButtonElement) => {
      if (!key || !(key in projects) || !dialog?.showModal) return;
      const data = projects[key as ProjectKey];
      opener.current = trigger;
      setText('dialogEyebrow', data.eyebrow);
      setText('dialogTitle', data.title);
      setText('dialogIntro', data.intro);
      setText('dialogChallenge', data.challenge);
      setText('dialogContribution', data.contribution);
      setText('dialogTech', data.tech);
      const link = byId('dialogLink') as HTMLAnchorElement | null;
      if (link) link.href = data.url;
      dialog.showModal();
      closeDialog?.focus();
    };
    document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(button => {
      listen(button, 'click', () => openCase(button.dataset.project, button));
    });
    listen(closeDialog, 'click', () => dialog?.close());
    listen(dialog, 'click', event => { if (event.target === dialog) dialog?.close(); });
    listen(dialog, 'close', () => { if (opener.current?.isConnected) opener.current.focus(); });

    listen(copyButton, 'click', async () => {
      const email = 'frankarimoro@gmail.com';
      if (!copyStatus) return;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = `Email copied: ${email}`;
      } catch {
        copyStatus.textContent = `You can copy it here: ${email}`;
      }
    });
    if (year) year.textContent = String(new Date().getFullYear());
    return () => { for (const stop of teardown.reverse()) stop(); };
  }, []);
  return null;
}
