import { stringify, parse } from 'flatted/cjs';

/* istanbul ignore next */
const getData = (params, callback) => {
  const { cacheName, cache, firstStep, steps } = params;
  const currentStep = firstStep;
  const renderedSteps = [steps[currentStep.id]];
  const previousSteps = [steps[currentStep.id]];
  const previousStep = {};
  const unParsedCache = localStorage.getItem(cacheName);

  if (cache && unParsedCache) {
    try {
      const data = parse(unParsedCache);

      for (let i = 0, len = data.renderedSteps.length; i < len; i += 1) {
        const renderedStep = data.renderedSteps[i];
        // remove delay of cached rendered steps
        data.renderedSteps[i].delay = 0;

        // TODO: Make chatflow continue after reloading while rendering text steps
        // // flag used to avoid call triggerNextStep in cached rendered steps
        // data.renderedSteps[i].rendered = true;
        // if (i === len - 1 && !data.currentStep.user && !data.renderedSteps[i].user)
        //   data.renderedSteps[i].rendered = false;

        // flag used to avoid call triggerNextStep in cached rendered steps
        data.renderedSteps[i].rendered = true;
        if (
          i === len - 1 &&
          !data.currentStep.user &&
          !data.currentStep.options &&
          !data.currentStep.choices
        )
          data.renderedSteps[i].rendered = false;

        // an error is thrown when render a component from localStorage.
        // So it's necessary reassing the component
        if (renderedStep.component) {
          const { id } = renderedStep;
          data.renderedSteps[i].component = steps[id].component;
        }
      }

      const { trigger, end, options } = data.currentStep;
      const { id } = data.currentStep;

      if (options) {
        delete data.currentStep.rendered;
      }

      // add trigger function to current step
      if (!trigger && !end) {
        if (options) {
          for (let i = 0; i < options.length; i += 1) {
            data.currentStep.options[i].trigger = steps[id].options[i].trigger;
          }
        } else {
          data.currentStep.trigger = steps[id].trigger;
        }
      }

      // if user, add validator and parser function
      if (data.currentStep.user) {
        data.currentStep.validator = steps[data.currentStep.id].validator;
        data.currentStep.parser = steps[data.currentStep.id].parser;
      }

      // execute callback function to enable input if last step is
      // waiting user type
      if (data.currentStep.user) {
        callback();
      }

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.info(
        `Unable to parse cache named:${cacheName}. \nThe cache where probably created with an older version of react-simple-chatbot.\n`,
        error
      );
    }
  }

  return {
    currentStep,
    previousStep,
    previousSteps,
    renderedSteps
  };
};

/* istanbul ignore next */
const setData = (cacheName, cachedData) => {
  const data = parse(stringify(cachedData));
  // clean components
  for (const key in data) {
    for (let i = 0, len = data[key].length; i < len; i += 1) {
      if (data[key][i].component) {
        data[key][i].component = data[key][i].id;
      }
    }
  }

  localStorage.setItem(cacheName, stringify(data));
};

export { getData, setData };
