import React, { Component } from "react";
import "./Stepper.css";

export default class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      // Completed - to add a check mark
      // Selected - to fill step with color
      // Highlighted - to make text of selected step bold
      steps: [],
    };
  }

  componentDidMount() {
    const { steps, currentStepNumber } = this.props;

    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step;
      stepObj.highlighted = index === 0 ? true : false;
      stepObj.selected = index === 0 ? true : false;
      stepObj.completed = false;
      return stepObj;
    });

    const currentSteps = this.updateStep(currentStepNumber, stepsState);

    this.setState({
      steps: currentSteps,
    });
  }

  componentDidUpdate(prevProps) {
    const { steps } = this.state;
    const currentSteps = this.updateStep(this.props.currentStepNumber, steps);

    if (prevProps.currentStepNumber !== this.props.currentStepNumber)
      this.setState({
        steps: currentSteps,
      });
  }

  updateStep(stepNumber, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;

    // Completed - to add a check mark
    // Selected - to fill step with color
    // Highlighted - to make text of selected step bold

    while (stepCounter < newSteps.length) {
      // Current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
          selected: true,
          completed: false,
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: true,
          completed: true,
        };
        stepCounter++;
      }
      // Future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
          selected: false,
          completed: false,
        };
        stepCounter++;
      }
    }

    return newSteps;
  }

  render() {
    const { direction, stepColor } = this.props;
    const { steps } = this.state;
    const stepsJSX = steps.map((step, index) => {
      return (
        <div className="step-wrapper" key={index}>
          <div
            className={`step-number ${
              step.selected ? "step-number-selected" : "step-number-disabled"
            }`}
            style={{ background: `${step.selected ? stepColor : "#c2d6d6"}` }}
          >
            <div
              className={`step-description ${
                step.highlighted && "step-description-active"
              }`}
            >
              {step.completed ? (
                <span>Step {index + 1} &#10003;</span>
              ) : (
                `Step ${index + 1}`
              )}
              <br></br>
              {step.description}
            </div>
          </div>
        </div>
      );
    });

    return <div className={`stepper-wrapper-${direction}`}>{stepsJSX}</div>;
  }
}
