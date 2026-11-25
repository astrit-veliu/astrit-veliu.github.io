import { $ } from '../../../src/core/dom.js';
import { emailAddress } from '../core/email.js';

const SUCCESS_DURATION = 5000;
let timer;

export function submitContact(form) {
  const { name, email, subject, message } = Object.fromEntries(new FormData(form));
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:${emailAddress()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.reset();

  const notice = $('#formSuccess');
  notice.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => {
    notice.hidden = true;
  }, SUCCESS_DURATION);
}
