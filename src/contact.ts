import type { ContactErrors, ContactForm, Topic } from './lib/contact'
import { validateContact } from './lib/contact'

const TOPICS: Array<{ value: Topic; label: string }> = [
  { value: 'order', label: 'A question about an order' },
  { value: 'trade', label: 'Trade enquiry' },
  { value: 'press', label: 'Press' },
  { value: 'other', label: 'Something else' },
]

function field(
  name: 'name' | 'email' | 'message',
  label: string,
  control: string,
  errors: ContactErrors,
): string {
  const error = errors[name]
  return `
    <div class="field">
      <label for="${name}">${label}</label>
      ${control}
      ${error ? `<p class="field__error" data-cy="error-${name}">${error}</p>` : ''}
    </div>
  `
}

function formHtml(form: ContactForm, errors: ContactErrors): string {
  return `
    <form class="contact-form" novalidate>
      ${field(
        'name',
        'Your name',
        `<input id="name" name="name" type="text" data-cy="name" value="${form.name}" />`,
        errors,
      )}
      ${field(
        'email',
        'Email address',
        `<input id="email" name="email" type="email" data-cy="email" value="${form.email}" />`,
        errors,
      )}
      <div class="field">
        <label for="topic">What's it about?</label>
        <select id="topic" name="topic" data-cy="topic">
          ${TOPICS.map(
            (topic) =>
              `<option value="${topic.value}" ${topic.value === form.topic ? 'selected' : ''}>${topic.label}</option>`,
          ).join('')}
        </select>
      </div>
      ${field(
        'message',
        'Your message',
        `<textarea id="message" name="message" rows="5" data-cy="message">${form.message}</textarea>`,
        errors,
      )}
      <label class="field--checkbox">
        <input name="newsletter" type="checkbox" data-cy="newsletter" ${form.newsletter ? 'checked' : ''} />
        Send me the occasional letter about new objects
      </label>
      <button type="submit" data-cy="submit">Send message</button>
      <div data-cy="banners"></div>
    </form>
  `
}

function readForm(formElement: HTMLFormElement): ContactForm {
  const data = new FormData(formElement)
  return {
    name: String(data.get('name') ?? ''),
    email: String(data.get('email') ?? ''),
    topic: (data.get('topic') ?? 'order') as Topic,
    message: String(data.get('message') ?? ''),
    newsletter: data.get('newsletter') !== null,
  }
}

async function submit(form: ContactForm): Promise<boolean> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    return response.ok
  } catch {
    return false
  }
}

function render(root: HTMLElement, form: ContactForm, errors: ContactErrors): void {
  root.innerHTML = `
    <header class="masthead wrap">
      <div class="masthead__row">
        <span class="masthead__mark">London <span>Objects</span></span>
        <nav class="masthead__nav" aria-label="Pages">
          <a href="/">Shop</a>
          <a href="/contact.html" aria-current="page">Contact</a>
        </nav>
      </div>
    </header>

    <section class="hero hero--small wrap">
      <h1>Say <em>hello</em>.</h1>
      <p>
        A question about an order, a wholesale enquiry, or a tip about a maker
        we should meet — we read everything.
      </p>
    </section>

    <main class="wrap contact">
      ${formHtml(form, errors)}
    </main>

    <footer class="footer wrap">
      <span>London Objects 2026 — a side project, lovingly overengineered.</span>
      <span>Columbia Road, London E2</span>
    </footer>
  `

  const formElement = root.querySelector<HTMLFormElement>('.contact-form')
  if (!formElement) return

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault()

    const submitted = readForm(formElement)
    const validationErrors = validateContact(submitted)
    if (Object.keys(validationErrors).length > 0) {
      render(root, submitted, validationErrors)
      return
    }

    const button = formElement.querySelector<HTMLButtonElement>('[data-cy=submit]')
    if (!button) return
    button.disabled = true
    button.textContent = 'Sending…'

    if (await submit(submitted)) {
      root.querySelector('.contact')!.innerHTML = `
        <div class="banner banner--success" data-cy="success-banner">
          <strong>Thanks, ${submitted.name.trim()}!</strong>
          Your message is on its way — we'll reply within a couple of days.
        </div>
      `
    } else {
      button.disabled = false
      button.textContent = 'Send message'
      formElement.querySelector('[data-cy=banners]')!.innerHTML = `
        <div class="banner banner--error" data-cy="error-banner">
          Something went wrong on our end — please try again, or email us at
          hello@londonobjects.example
        </div>
      `
    }
  })
}

const root = document.querySelector<HTMLElement>('#app')
if (!root) throw new Error('Missing #app root element')

render(
  root,
  { name: '', email: '', topic: 'order', message: '', newsletter: false },
  {},
)
