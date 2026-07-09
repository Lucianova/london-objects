import type { ContactForm } from './contact'
import { validateContact } from './contact'

const createForm = (overrides: Partial<ContactForm> = {}): ContactForm => ({
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  topic: 'order',
  message: 'I would love a vase for my dramatic branch collection.',
  newsletter: false,
  ...overrides,
})

test('when the form is valid', () => {
  expect(validateContact(createForm())).toEqual({})
})

test('when the name is empty', () => {
  expect(validateContact(createForm({ name: '   ' }))).toHaveProperty('name')
})

test('when the email is empty', () => {
  const errors = validateContact(createForm({ email: '' }))
  expect(errors.email).toBe('Please give us an email address')
})

test.each(['not-an-email', 'missing@tld', '@nobody.com', 'spaces in@it.com'])(
  'when the email is malformed: %s',
  (email) => {
    const errors = validateContact(createForm({ email }))
    expect(errors.email).toBe("That doesn't look like an email address")
  },
)

test('when the email has surrounding whitespace', () => {
  expect(validateContact(createForm({ email: '  ada@example.com  ' }))).toEqual({})
})

test('when the message is empty', () => {
  const errors = validateContact(createForm({ message: '' }))
  expect(errors.message).toBe('Please write us a message')
})

test('when the message is too short', () => {
  const errors = validateContact(createForm({ message: 'Hi there!' }))
  expect(errors.message).toContain('at least 20 characters')
})

test('when the message is exactly 20 characters', () => {
  expect(validateContact(createForm({ message: 'x'.repeat(20) }))).toEqual({})
})

test('when everything is wrong at once', () => {
  const errors = validateContact(createForm({ name: '', email: 'nope', message: '' }))
  expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
})
