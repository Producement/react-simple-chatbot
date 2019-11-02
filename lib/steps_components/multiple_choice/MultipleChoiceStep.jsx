import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';
import ChoiceElement from './ChoiceElement';
import MultipleChoice from './MultipleChoice';
import MultipleChoiceStepContainer from './MultipleChoiceStepContainer';

class MultipleChoiceStep extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    choices: this.props.step.choices.map(choice => Object.assign({}, choice, { selected: false }))
  };

  getNumberOfSelectedChoices = choices => {
    return choices.filter(each => each.selected).length;
  };

  onChoiceClick = choice => {
    const { choices } = this.state;
    const { step } = this.props;
    const { maxChoices } = step;

    const sameChoiceFromState = choices.find(
      each => JSON.stringify(each) === JSON.stringify(choice)
    );
    if (!sameChoiceFromState.selected && this.getNumberOfSelectedChoices(choices) >= maxChoices) {
      return;
    }
    sameChoiceFromState.selected = !sameChoiceFromState.selected;

    this.setState({ choices });
  };

  onSubmitClick = () => {
    const { triggerNextStep, step } = this.props;
    const { minChoices } = step;
    const { choices } = this.state;

    if (this.getNumberOfSelectedChoices(choices) >= minChoices) {
      triggerNextStep(
        choices
          .filter(choice => choice.selected)
          .map(choice => {
            const copy = Object.assign({}, choice);
            delete copy.selected;
            return copy;
          })
      );
    }
  };

  renderChoice = choice => {
    const { bubbleChoiceStyle, step } = this.props;
    const { user } = step;
    const { label } = choice;

    return (
      <Choice key={JSON.stringify(choice)} className="rsc-mcs-choice">
        <ChoiceElement
          className={`rsc-mcs-choice-element ${
            choice.selected ? 'rsc-mcs-choice-element--selected' : ''
          }`}
          style={bubbleChoiceStyle}
          user={user}
          onClick={() => this.onChoiceClick(choice)}
        >
          {choice.selected ? '✓' : ''}
          {label}
        </ChoiceElement>
      </Choice>
    );
  };

  render() {
    const { choices } = this.state;
    const { bubbleChoiceStyle } = this.props;

    return (
      <MultipleChoiceStepContainer className="rsc-mcs">
        <MultipleChoice className="rsc-mcs-choices">
          {Object.keys(choices)
            .map(key => choices[key])
            .map(this.renderChoice)}
          <Choice className="rsc-mcs-submit">
            <ChoiceElement
              className="rsc-mcs-submit-element"
              style={bubbleChoiceStyle}
              onClick={this.onSubmitClick}
            >
              ✓
            </ChoiceElement>
          </Choice>
        </MultipleChoice>
      </MultipleChoiceStepContainer>
    );
  }
}

MultipleChoiceStep.propTypes = {
  bubbleChoiceStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

export default MultipleChoiceStep;
