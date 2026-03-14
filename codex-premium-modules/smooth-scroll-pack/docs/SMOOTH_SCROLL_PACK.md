# Smooth Scroll Pack

Use smooth scrolling only on marketing surfaces where it improves pacing.
Never make it a hard dependency for product UI or core app workflows.

## Best fit
- long-form premium landing pages
- editorial reveal sequences
- page flows where momentum matters more than task density

## Do not use when
- the project is an authenticated app shell
- forms, tables, or dense settings screens dominate the page
- native anchor behavior matters more than premium feel

## Repo policy
- marketing React or static: allowed in `auto`
- app-saas: docs only in `auto`
- standard mode: not applicable

## QA gates
- scroll remains controllable on touch devices
- reduced-motion path disables the enhancement cleanly
- sticky and anchor behavior still works