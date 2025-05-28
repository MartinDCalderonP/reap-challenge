# Reap Take-Home Test: Dynamic Secured Form Submission Feature

## Project Overview
Build a feature that allows an admin to create a custom form by selecting fields and organizing them into sections. The admin can then generate a secure, shareable URL for the form. Anyone with the link can fill out and submit the form (no login required).

## User Stories

### 1. Admin User
- As an admin, I can create a new form by:
  - Adding sections (e.g., "Personal Info", "Financial Details").
  - Adding fields to each section (text and number fields only).
- As an admin, I can generate a secure URL for the form.
- As an admin, I can log in (hardcoded credentials are fine) to create forms.

### 2. Public User (No Login)
- As a public user, I can access the form via a secure URL.
- As a public user, I see the form as designed by the admin (sections, fields).
- As a public user, I can fill out and submit the form.
- As a public user, I see a confirmation after submitting.

## Technical Requirements

### Backend
- Use Express.js, Prisma, and PostgreSQL.
- Use Prisma migrations for database schema changes.
- Allow admins to define forms with sections and fields (store form schema in DB).
- Support basic field types: text and number only.
- Create an endpoint for admins to generate a secure, tokenized URL for a form.
- Store form submissions in the database, linked to the form and token.
- Validate tokens on form access and submission.

### Frontend
- Use Next.js and Tailwind CSS.
- Build a simple admin page (protected route, hardcoded login is fine) to:
  - Create a new form (add sections, add fields to sections, choose field types).
  - Generate new form links.
- Build a public form page that renders the form dynamically based on the schema.
- Show a confirmation message after successful submission.

### Security
- Ensure form URLs are unguessable (secure random tokens).
- No authentication required for public form access, but admin page must be protected.

### Testing
- (Optional) Include a basic test for backend logic (e.g., token validation or form submission).

## Deliverables
- Source code (GitHub repo or zip file).
- Brief README with setup instructions and any notes.
- (Optional) Short Loom/video walkthrough.

## Evaluation Criteria
- Code quality, structure, and maintainability.
- Flexibility and correctness of dynamic form logic.
- Security and correctness of token logic.
- UX and usability of both admin and public flows.
- Appropriate use of stack (TypeScript, Next.js, Express, Prisma).
- Testing and documentation (if included).

## Time Expectation
- Please spend no more than 6 hours on this test.
- Focus on core functionality; 
