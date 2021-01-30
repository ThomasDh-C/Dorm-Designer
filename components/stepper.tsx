import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}),
)

function getSteps() {
    return ['Set building scale', 'Arrange dorm furniture', 'Any other furniture']
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return 'Drag the scale to the same size as the one on the diagram. Use the scroll wheel to zoom in and out'
        case 1:
            return 'Drag furniture to the correct spot.'
        case 2:
            return 'Paste new urls into the adder and enter their length in ft'
        default:
            return 'Unknown step'
    }
}

export default function HorizontalLinearStepper({ activeStep, setActiveStep }) {
    const classes = useStyles()

    const steps = getSteps()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }



    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {}
                    const labelProps: { optional?: React.ReactNode } = {}
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>Want to try a different layout?</Typography>
                        <Button onClick={handleReset} className={classes.button}>Restart</Button>
                    </div>) : (
                        <div>
                            <Typography className={classes.instructions}> {getStepContent(activeStep)} </Typography>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}