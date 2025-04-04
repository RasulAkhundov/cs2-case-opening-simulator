'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LocaleLink({ href, children, ...props }) {
  const params = useParams();
  const locale = params?.locale || 'en'; // fallback just in case

  const fullHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;

  return (
    <Link href={fullHref} {...props}>
      {children}
    </Link>
  );
}