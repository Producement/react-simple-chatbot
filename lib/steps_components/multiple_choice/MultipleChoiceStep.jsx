import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';
import ChoiceElement from './ChoiceElement';
import MultipleChoice from './MultipleChoice';
import MultipleChoiceStepContainer from './MultipleChoiceStepContainer';

class MultipleChoiceStep extends Component {
  onOptionClick = option => {
    const { triggerNextStep } = this.props;

    triggerNextStep(option);
  };

  renderOption = option => {
    const { bubbleOptionStyle, step } = this.props;
    const { user } = step;
    const { label } = option;

    return (
      <Choice key={JSON.stringify(option)} className="rsc-os-option">
        <ChoiceElement
          className="rsc-os-option-element"
          style={bubbleOptionStyle}
          user={user}
          onClick={() => this.onOptionClick(option)}
        >
          {label}
        </ChoiceElement>
      </Choice>
    );
  };

  render() {
    const { step } = this.props;
    const { options } = step;

    return (
      <MultipleChoiceStepContainer className="rsc-os">
        <MultipleChoice className="rsc-os-options">
          {Object.keys(options)
            .map(key => options[key])
            .map(this.renderOption)}
        </MultipleChoice>
      </MultipleChoiceStepContainer>
    );
  }
}

MultipleChoiceStep.propTypes = {
  bubbleOptionStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.objectOf(PropTypes.any).isRequired,
  triggerNextStep: PropTypes.func.isRequired
};

export default MultipleChoiceStep;
