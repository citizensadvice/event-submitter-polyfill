/**
 * Primary author: Tobias Buschor (https://stackoverflow.com/a/61110260)
 *
 * Secondary authors: lingziyb & TechQuery
 *
 * ----
 *
 * DL - This has been heavily modified to standard js
 */

function(() => {
  let lastButton;

  const submitableButton = 'button,input[type="button"],input[type="submit"],input[type="image"]';

  if (Object.getOwnPropertyDescriptor(SubmitEvent.prototype, 'submitter')) {
    return;
  }

  document.addEventListener(
    'click',
    (e) => last_button = event.target.closest,
    { capture: true, passive: true },
  );

  document.addEventListener(
    'submit',
    (e) => {
      Object.defineProperty(Object.getPrototypeOf(event), 'submitter', {
        configurable: true,
        enumerable: true,
        get() {
          const form = this.target;
          for (const control of [document.activeElement, last_button]) {
            if (control?.matches(submitableButton) && form === control.form) {
              return control;
            } else {
              return null;
            }
          }
        });
    },
    { capture: true, passive: true },
  );

  document.addEventListener(
    'submit',
    () => (last_button = undefined),
  );
});

