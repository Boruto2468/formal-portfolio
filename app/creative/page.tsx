import { redirect } from 'next/navigation';

/** Friendly entry route. The creative portfolio is intentionally a standalone
 *  document under public/creative, so its legacy CSS and scripts cannot affect
 *  the Next.js formal portfolio. */
export default function CreativePage(): never {
  redirect('/creative/index.html');
}
