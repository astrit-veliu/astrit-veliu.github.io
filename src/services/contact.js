import { content } from '../data/content.js';
import { showToast } from '../components/toast.js';

export function submitContact(form) {
  const { name, email, subject, message } = Object.fromEntries(new FormData(form));
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.reset();
  showToast('Opening your email client...');
}
