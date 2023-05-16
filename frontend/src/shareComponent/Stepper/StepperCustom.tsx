import { useTheme } from "@mui/material";
import {
  Calculate,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  PropaneSharp,
} from "@mui/icons-material";
import { Button, MobileStepper, Stepper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { scrollElementToCenter } from "../Carousel";

interface StepperCustomProps {
  maxSteps: number;
  nameId: string;
}

export const StepperCustom = (props: StepperCustomProps) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    scrollElementToCenter(props.nameId + activeStep.toString());
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollElementToCenter(props.nameId + activeStep.toString());
  };
  return (
    <div className="justify-items-center">
      <MobileStepper
        steps={props.maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === props.maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </div>
  );
};
