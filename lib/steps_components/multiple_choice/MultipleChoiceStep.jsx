import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Choice from './Choice';
import ChoiceElement from './ChoiceElement';
import MultipleChoice from './MultipleChoice';
import MultipleChoiceStepContainer from './MultipleChoiceStepContainer';

class MultipleChoiceStep extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    choices: this.props.step.choices.map(choice => Object.assign({}, choice, { checked: false }))
  };

  onChoiceClick = choice => {
    const { choices } = this.state;

    choices.find(each => JSON.stringify(each) === JSON.stringify(choice)).checked = true;

    this.setState({ choices });
  };

  onSubmitClick = () => {
    const { triggerNextStep } = this.props;
    const { choices } = this.state;

    triggerNextStep(choices.filter(choice => choice.checked));
  };

  renderChoice = choice => {
    const { bubbleChoiceStyle, step } = this.props;
    const { user } = step;
    const { label } = choice;

    return (
      <Choice key={JSON.stringify(choice)} className="rsc-mcs-choice">
        <ChoiceElement
          className="rsc-mcs-choice-element"
          style={bubbleChoiceStyle}
          user={user}
          onClick={() => this.onChoiceClick(choice)}
        >
          {label}
        </ChoiceElement>
      </Choice>
    );
  };

  render() {
    const { choices } = this.state;

    return (
      <MultipleChoiceStepContainer className="rsc-mcs">
        <MultipleChoice className="rsc-mcs-choices">
          {Object.keys(choices)
            .map(key => choices[key])
            .map(this.renderChoice)}
          <button type="button" onClick={this.onSubmitClick}>
            Confirm
          </button>
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
