import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MultipleChoiceStep from '../../lib/steps_components/multiple_choice/MultipleChoiceStep';
import ChoiceElement from '../../lib/steps_components/multiple_choice/ChoiceElement';

describe('MultipleChoiceStep', () => {
  let chosenChoices = [];

  const props = {
    step: {
      id: '1',
      choices: [
        { value: 'choice1', label: 'Choice 1' },
        { value: 'choice2', label: 'Choice 2' },
        { value: 'choice3', label: 'Choice 3' }
      ]
    },
    bubbleStyle: {},
    triggerNextStep: choices => {
      chosenChoices = choices;
    }
  };

  // eslint-disable-next-line react/jsx-filename-extension
  const wrapper = mount(<MultipleChoiceStep {...props} />);
  wrapper.setState({ loading: false });

  it('should render', () => {
    expect(wrapper.find(MultipleChoiceStep).length).to.be.equal(1);
  });

  it('should render 2 options', () => {
    expect(wrapper.find(ChoiceElement).length).to.be.equal(2);
  });

  it("should render the first option with label equal 'Choice 1'", () => {
    const label = wrapper
      .find(ChoiceElement)
      .first()
      .text();
    expect(label).to.be.equal('Choice 1');
  });

  it("should render the second option with label equal 'Choice 2'", () => {
    const label = wrapper
      .find(ChoiceElement)
      .get(1)
      .text();
    expect(label).to.be.equal('Choice 2');
  });

  it("should render the second option with label equal 'Choice 3'", () => {
    const label = wrapper
      .find(ChoiceElement)
      .get(2)
      .text();
    expect(label).to.be.equal('Choice 3');
  });

  it('should render the confirm button', () => {
    expect(wrapper.find('button.rsc-mcs-submit-element').length).to.equal(1);
  });

  it('should return chosen choices', () => {
    const chooseIndices = [0, 2];
    const choiceElements = wrapper.find('button.rsc-mcs-choice-element');
    for (const index of chooseIndices) {
      choiceElements.get(index).simulate('click');
    }

    // wait until triggerNextStep() populates chosenChoices
    while (!chosenChoices);

    const { choices } = props.step;
    const chooseChoices = choices.filter((_, index) => chooseIndices.includes(index));

    for (const chosenChoice of chosenChoices) {
      expect(chosenChoice).to.be.in(chooseChoices);
    }
  });
});
