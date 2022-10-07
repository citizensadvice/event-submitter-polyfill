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
    (e) => {
      lastButton = e.target.closest(submitableButton);
    },
    { capture: true, passive: true },
  );

  document.addEventListener(
    'submit',
    (e) => {
      if ('submitter' in e) {
        return;
      }
      const currentLastButton = lastButton;
      Object.defineProperty(
        e,
        'submitter',
        {
          configurable: true,
          enumerable: true,
          get() {
            const form = this.target;
            if (currentLastButton?.matches(submitableButton) && form === currentLastButton.form) {
              return currentLastButton;
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

