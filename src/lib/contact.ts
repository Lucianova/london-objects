export type Topic = 'order' | 'trade' | 'press' | 'other'

export interface ContactForm {
  name: string
  email: string
  topic: Topic
  message: string
  newsletter: boolean
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 20

export function validateContact(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}

  if (form.name.trim() === '') {
    errors.name = 'Please tell us your name'
  }

  if (form.email.trim() === '') {
    errors.email = 'Please give us an email address'
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "That doesn't look like an email address"
  }

  if (form.message.trim() === '') {
    errors.message = 'Please write us a message'
  } else if (form.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Tell us a little more — at least ${MIN_MESSAGE_LENGTH} characters`
  }

  return errors
}
