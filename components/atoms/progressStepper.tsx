import { Steps, Button } from 'antd';
import React from 'react'

const { Step } = Steps

const steps = [
    {
        title: 'Set building scale',
        content: 'Drag the scale to the same size as the one on the diagram. Use the scroll wheel to zoom in and out',
    },
    {
        title: 'Arrange dorm furniture',
        content: 'Drag furniture to the correct spot.',
    },
    {
        title: 'Add other furniture',
        content: 'Paste new urls into the adder and enter their length in ft',
    },
];

const ProgressStepper = ({ activeStep, setActiveStep }) => {

    const next = () => {
        setActiveStep(activeStep + 1)
    };

    const prev = () => {
        setActiveStep(activeStep - 1)
    };

    const restart = () => {
        setActiveStep(0)
    }

    return (
        <>
            <Steps current={activeStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[activeStep].content}</div>
            <div className="steps-action">

                <Button style={{ margin: '0 8px' }} onClick={() => prev()} disabled={activeStep === 0}>
                    Previous
                </Button>

                {activeStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {activeStep === steps.length - 1 && (
                    <Button type="primary" onClick={() => restart()}>
                        Restart
                    </Button>
                )}

            </div>
        </>
    )
}

export default ProgressStepper