import { useEffect } from 'react';

/**
 * Custom hook untuk mengatur title dan meta description halaman secara dinamis.
 *
 * @param {string} title - Judul halaman (akan muncul di tab browser)
 * @param {string} description - Meta deskripsi halaman (penting untuk SEO)
 */
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }

    if (description) meta.content = description;
  }, [title, description]);
}
