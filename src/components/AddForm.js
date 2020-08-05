import React, { useState } from 'react'
import { Formik, Form, useField } from 'formik'
import BForm from 'react-bootstrap/Form'
import { Row, Col, Button } from 'react-bootstrap'

import * as yup from 'yup'

const TextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return (
        <>
            <BForm.Control
                type='text'
                placeholder={placeholder}
                {...field}
                isValid={meta.touched && !meta.error}
                isInvalid={meta.touched && !!meta.error}
                feedback={errorText}
            />
            <BForm.Control.Feedback type="invalid">
                {errorText}
            </BForm.Control.Feedback>
        </>
    )
}

const validationSchema = yup.object({
    id: yup.number().typeError('id must be a number').required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    description: yup.string(),
    address: yup.object({
        streetAddress: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required()
    })

})

const AddForm = (props) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    description: '',
                    address: {
                        streetAddress: '',
                        city: '',
                        state: '',
                        zip: ''
                    }

                }}
                initialErrors={'form is empty'}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                    setIsSubmitting(true)
                    props.onAddData(data)
                    setIsSubmitting(false)
                }}
            >
                {(values) => (
                    <Form>
                        <Row>
                            <Col xs={2}>
                                <BForm.Label>Id</BForm.Label>
                                <TextField placeholder='Id' name='id' />
                            </Col>
                            <Col xs={5}>
                                <BForm.Label>Имя</BForm.Label>
                                <TextField placeholder='First name' name='firstName' />
                            </Col>
                            <Col xs={5}>
                                <BForm.Label>Фамилия</BForm.Label>
                                <TextField placeholder='Last name' name='lastName' />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col xs={6}>
                                <BForm.Label>Email</BForm.Label>
                                <TextField placeholder='Email' name='email' />
                            </Col>
                            <Col xs={6}>
                                <BForm.Label>Phone</BForm.Label>
                                <TextField placeholder='Phone' name='phone' />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col xs={12}>
                                <BForm.Label>Description</BForm.Label>
                                <TextField placeholder='Description' name='description' />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col xs={3}>
                                <BForm.Label>Street</BForm.Label>
                                <TextField placeholder='Street' name='address.streetAddress' />
                            </Col>
                            <Col xs={3}>
                                <BForm.Label>City</BForm.Label>
                                <TextField placeholder='City' name='address.city' />
                            </Col>
                            <Col xs={3}>
                                <BForm.Label>State</BForm.Label>
                                <TextField placeholder='State' name='address.state' />
                            </Col>
                            <Col xs={3}>
                                <BForm.Label>Zip Code</BForm.Label>
                                <TextField placeholder='Zip' name='address.zip' />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className='float-right'>
                                <Button className=' float-right' disabled={!values.isValid || values.isDirty || isSubmitting} type='submit' variant='success'>Добавить</Button>
                            </Col>
                        </Row>

                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default AddForm