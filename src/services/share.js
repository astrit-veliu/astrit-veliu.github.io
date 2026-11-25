import { content } from '../data/content.js';
import { showToast } from '../components/toast.js';

export async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard');
  } catch {
    showToast('Could not copy the link', 'error');
  }
}

export function openLink() {
  window.open(window.location.href, '_blank', 'noopener');
}

export async function shareLink() {
  if (!navigator.share) {
    await copyLink();
    return;
  }
  try {
    await navigator.share({
      title: document.title,
      text: `Take a look at the portfolio of ${content.profile.name}`,
      url: window.location.href,
    });
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Could not share the link', 'error');
  }
}
