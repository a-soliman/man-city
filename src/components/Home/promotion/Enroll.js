import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase/firebase';

class Enroll extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    };

    onEmailFieldChange = (event, id) => {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[id]}
        newElement.value = event.target.value;
        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        console.log(newElement.valid, newElement.validationMessage);
        newFormData[id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });

        newElement.valid ? this.activateSubmit(true) : this.activateSubmit(false)
    };

    activateSubmit = (bool) => {
        const submitButton = document.querySelector('#submit_btn');
        bool == true ?
            submitButton.removeAttribute('disabled')
            : submitButton.setAttribute('disabled', true);
    }
    resetFormSuccess = (value) => {
        const newFormData = {...this.state.formData};
        for ( let key in newFormData ) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }
        this.setState({
            formError: false,
            formData: newFormData,
            formSuccess: value ? 'Congratulations' : 'Your email is already enrolled'
        });
        this.clearSuccessMessage();
    }

    clearSuccessMessage = () => {
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000);
    }
    
    
    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for ( let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if ( formIsValid ) {
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
                .then((snapshot) => {
                  if(snapshot.val() === null ) {
                    firebasePromotions.push(dataToSubmit);
                    this.resetFormSuccess(true);
                  } else {
                    this.resetFormSuccess(false);
                  }

                })
            this.resetFormSuccess();
        } else {
            this.setState({
                formError: true
            });
        }
    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={ (event) => this.submitForm(event) }>
                        <div className="enroll_title">Enter your email</div>
                        <div className="enroll_input">
                            <FormField 
                                id={'email'}
                                formData={this.state.formData.email}
                                onChangeHandler={this.onEmailFieldChange}
                            />
                            { this.state.formError && <div className="error_label">Something is wrong!</div>}
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button id="submit_btn" type="submit" disabled>Enroll</button>
                            <div className="enroll_discl">
                                Aliquip exercitation esse amet excepteur laboris nostrud exercitation laboris.
                            </div>
                        </div>
                    </form>
                </div>

            </Fade>
        );
    }
}

export default Enroll;