(() => {
  const Styles = {
    HIGLIGHT: 'highlight',
  };

  const Selectors = {
    INGREDIENT_ITEMS: '#steps li',
  };

  const KeyCodes = {
    LEFT: 37,
    RIGHT: 39,
  };

  function onKeyDown(e) {
    const { HIGLIGHT } = Styles;
    const curr = document.querySelector(`.${HIGLIGHT}`);
    if (!curr) {
      return;
    }

    switch (e.which) {
      case KeyCodes.LEFT:
        curr.classList.remove(HIGLIGHT);
        curr.previousElementSibling?.classList.add(HIGLIGHT);
        break;
      case KeyCodes.RIGHT:
        curr.classList.remove(HIGLIGHT);
        curr.nextElementSibling?.classList.add(HIGLIGHT);
        break;
    }

    // ignore normal L/R behavior
    // (probably don't want to do this, since
    // we want to use L/R for the back button, etc)
    // e.preventDefault();
  }

  function onStepClick() {
    const { HIGLIGHT } = Styles;
    if (this.classList.contains(HIGLIGHT)) {
      this.classList.remove(HIGLIGHT);
    } else {
      document.querySelector(`.${HIGLIGHT}`)?.classList.remove(HIGLIGHT);
      this.classList.add(HIGLIGHT);
    }
  }

  function init() {
    // click a step to highlight it
    document.querySelectorAll(Selectors.INGREDIENT_ITEMS).forEach(step => step.addEventListener('click', onStepClick));
    // L/R arrow keys shift the step highlight
    document.addEventListener('keydown', onKeyDown);
  }

  init();
})();
