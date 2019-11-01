import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';

import MultipleChoiceStep from '../../lib/steps_components/multiple_choice/MultipleChoiceStep';

const ChoiceElementSelector = 'button.rsc-mcs-choice-element';
const SubmitElementSelector = 'button.rsc-mcs-submit-element';

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

  it('should render 3 options', () => {
    expect(wrapper.find(ChoiceElementSelector).length).to.be.equal(3);
  });

  it("should render the first option with label equal 'Choice 1'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(0)
      .text();
    expect(label).to.be.equal('Choice 1');
  });

  it("should render the second choice with label equal 'Choice 2'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(1)
      .text();
    expect(label).to.be.equal('Choice 2');
  });

  it("should render the third choice with label equal 'Choice 3'", () => {
    const label = wrapper
      .find(ChoiceElementSelector)
      .at(2)
      .text();
    expect(label).to.be.equal('Choice 3');
  });

  it('should render the confirm button', () => {
    expect(wrapper.find(SubmitElementSelector).length).to.equal(1);
  });

  it('should allow selecting of choices', () => {
    const choiceElements = wrapper.find(ChoiceElementSelector);
    choiceElements.at(0).simulate('click');
    choiceElements.at(1).simulate('click');
    choiceElements.at(2).simulate('click');

    wrapper.update();
    const updatedChoiceElements = wrapper.find(ChoiceElementSelector);
    expect(updatedChoiceElements.at(0).text()).to.contain('✓');
    expect(updatedChoiceElements.at(1).text()).to.contain('✓');
    expect(updatedChoiceElements.at(2).text()).to.contain('✓');
  });

  it('should allow deselecting of choices', () => {
    const choiceElements = wrapper.find(ChoiceElementSelector);
    choiceElements.at(1).simulate('click');

    wrapper.update();
    const updatedChoiceElements = wrapper.find(ChoiceElementSelector);
    expect(updatedChoiceElements.at(1).text()).to.not.contain('✓');
  });

  it('should return chosen choices after confirmation', () => {
    wrapper.find(SubmitElementSelector).simulate('click');
    wrapper.update();

    const chooseIndices = [0, 2];

    // wait until triggerNextStep() populates chosenChoices
    while (!chosenChoices.length);

    const { choices } = props.step;
    const chooseChoices = choices.filter((_, index) => chooseIndices.includes(index));

    for (const choice of chooseChoices) {
      expect(chosenChoices).to.deep.include(choice);
    }
  });
});
