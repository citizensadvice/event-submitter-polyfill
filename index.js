/**
 * Primary author: Tobias Buschor (https://stackoverflow.com/a/61110260)
 *
 * Secondary authors: lingziyb & TechQuery
 *
 * ----
 *
 * DL - This has been heavily modified to standard js
 */

(() => {
  let lastButton;

  const submitableButton = 'button,input[type="button"],input[type="submit"],input[type="image"]';

  document.addEventListener(
    'click',
    (e) => lastButton = e.target.closest,
    { capture: true, passive: true },
  );

  document.addEventListener(
    'submit',
    (e) => {
      console.log('submitter' in e);
      if ('submitter' in e) {
        return;
      }
      Object.defineProperty(
        Object.getPrototypeOf(e),
        'submitter',
        {
          configurable: true,
          enumerable: true,
          get() {
            const form = this.target;
            for (const control of [document.activeElement, lastButton]) {
              if (control?.matches(submitableButton) && form === control.form) {
                return control;
              }
            }
            return null;
          },
        },
      );
    },
    { capture: true, passive: true },
  );

  document.addEventListener(
    'submit',
    () => (lastButton = undefined),
  );
})();

