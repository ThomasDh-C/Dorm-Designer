import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import UploadFloorPlan from '../atoms/uploadFloorPlan'
import { Formik, Form, Field, ErrorMessage } from "formik"

const FlexSection = styled.section`
    display: flex;
    flex-direction: row;
    margin-right: 16px;
`

const LargeForm = styled(Form)`
    width: 100%;
    flex-basis: 100%;
    flex-grow: 3;
    padding-left: 8px;
`

const SingleLineLabel = styled.label`
    display: block;
`

const ShortField = styled(Field)`
    width: 3rem;
`
const LongField = styled(ShortField)`
    display: block;
    width: 100%;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`
const Horiz = styled(Row)`
    justify-content: flex-start;
`

const Child = styled.div`
    padding-right: 8px;
    // flex-basis: auto;
    flex-basis: 100%;
    flex: 1;
`

const CreateNewFile = ({currFile, setFile}) => { 
    const router = useRouter()

    const validateInput = (values) => {
        let errors = {};
        if (!values?.name) {
            errors = {...errors, name:"Required"}
        }

        if (!values?.scale) {
            errors = {...errors, scale:"Required"}
        } else if (!/^[0-9]+/i.test(values.scale)) {
            errors = {...errors, scale:"Enter a number"}
        }

        if (!values?.occupancy) {
            errors = {...errors, occupancy:"Required"}
        } else if (!/^[0-9]+/i.test(values.occupancy)) {
            errors = {...errors, occupancy:"Enter a number"}
        }
        return errors
    }

    const handleInput = (values, { setSubmitting }) => {
        if (currFile.floorplan) {
            let temp = {}
            Object.keys(values).forEach(function(key) {
                if(key=='name'){
                    temp[key] = values[key]
                }
                else{
                    temp[key] = eval(values[key])
                }
              })
            const newFile = {...currFile, ...temp}
            setFile(newFile)
            setSubmitting(false)
            localStorage.setItem('currshape', JSON.stringify(newFile))
            router.push('./'+ currFile.id)
        }
    }
    

    return (
        <FlexSection>
            <UploadFloorPlan setFile={setFile}/>
            <Formik
                initialValues={{name: "", scale: 1/16, occupancy: 4 }}
                validate={validateInput}
                onSubmit={handleInput}
                >
                {({ isSubmitting, dirty, handleReset }) => (
                    <LargeForm>
                        <div>
                            <SingleLineLabel>Floorplan Name</SingleLineLabel>
                            <LongField type="text" name="name" />
                            <ErrorMessage name="name" component="span" />
                        </div>
                        <Row>
                            <Child>
                                <SingleLineLabel>Scale</SingleLineLabel>
                                <Horiz>
                                    <ShortField type="text" name="scale" />
                                    <label style={{paddingLeft: '4px'}}>'': 1'</label>
                                </Horiz>
                                <ErrorMessage name="scale" component="span" />
                            </Child>
                            <Child>
                                <SingleLineLabel>Occupancy</SingleLineLabel>
                                <Horiz>
                                    <ShortField type="text" name="occupancy" />
                                    <label style={{paddingLeft: '4px'}}>people</label>
                                </Horiz>
                                
                                <ErrorMessage name="occupancy" component="span" />
                            </Child>
                        </Row>
                        <Row style={{justifyContent: 'flex-end'}}>
                            <button type="reset" onClick={handleReset}>
                                Reset
                            </button>
                            <button type="submit" disabled={!dirty || isSubmitting}>
                                Submit
                            </button>
                        </Row>
                        
                    </LargeForm>
                )}
                </Formik>
        </FlexSection>)
}

export default CreateNewFile