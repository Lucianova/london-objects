// Your Cypress exercise sheet!
//
// Every test below has a title but no body, so Cypress lists it as
// "pending". Your job is to make them real, one at a time, from top to
// bottom — they get harder as they go. Give each `it` a callback function
// and write the test inside:
//
//   it('shows the contact form', () => {
//     cy.visit('/contact.html')
//     // ...
//   })
//
// Handy references:
//   - selectors: every important element has a data-cy attribute,
//     e.g. cy.get('[data-cy=email]')
//   - assertions: https://docs.cypress.io/app/references/assertions
//   - network stubbing: https://docs.cypress.io/api/commands/intercept

describe('Contact page', () => {
  // 1. Warm-up: cy.visit() the page, check the name, email, topic, message
  //    and newsletter fields are all visible.
  it('shows the contact form with all its fields')

  // 2. Start from the shop page ('/') and get here by clicking the header
  //    link. Assert the URL changed (cy.location or cy.url).
  it('navigates from the shop to the contact page via the header')

  // 3. Click send without typing anything. Three inline errors should
  //    appear ([data-cy=error-name], -email, -message).
  it('shows errors when submitting an empty form')

  // 4. Fill everything correctly EXCEPT the email ("not-an-email").
  //    Only the email error should show.
  it('shows an error for an invalid email address')

  // 5. Submit an empty form, then fix just the name and submit again.
  //    The name error should be gone; the others should remain.
  it('clears an error once its field is fixed')

  // 6. First cy.intercept() — stub POST /api/contact with { ok: true },
  //    give it an alias, submit a valid form, cy.wait() for the alias,
  //    then assert [data-cy=success-banner] greets you by name.
  it('submits successfully and greets you by name')

  // 7. Stub the same route with statusCode: 500. The error banner should
  //    appear and the form should still be there for another try.
  it('shows the error banner when the API is down')

  // 8. Stub with a delay (e.g. { delay: 1000 }) and assert the submit
  //    button is disabled and says "Sending…" while the request is in
  //    flight — then re-check after the response lands.
  it('disables the submit button while the request is in flight')
})
