import React, { Component } from 'react';
import AdminLayout from '../../Hoc/adminlayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import FileUploaderComponent from '../../ui/FileUploaderComponent';
import database, { firebasePlayers, firebaseStorage }  from '../../../firebase/firebase';
import { firebaseLooper } from '../../ui/misc';

class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            name: {
                element:'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element:'input',
                value: '',
                config: {
                    label: 'Player Lastname',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element:'input',
                value: '',
                config: {
                    label: 'Player number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element:'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key: "Keeper", value: "Keeper"},
                        {key: "Defence", value: "Defence"},
                        {key: "Midfield", value: "Midfield"},
                        {key: "Striker", value: "Striker"}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    };

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormData = {...this.state.formData};
        for( let key in newFormData ) {
            newFormData[key].value = player[key];
            newFormData[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formData: newFormData
        });
    };

    componentDidMount = () => {
        const playerId = this.props.match.params.id;

        if ( !playerId ) {
            this.setState({ formType: 'Add player' });
        } else {
            database.ref(`players/${playerId}`).once('value')
                .then(snapshot => {
                    const playerData = snapshot.val();

                    firebaseStorage.ref('players')
                        .child(playerData.image).getDownloadURL()
                            .then( url => {
                                this.updateFields(playerData, playerId, 'Edit player', url);
                            }).catch( e => {
                                this.updateFields({
                                    ...playerData,
                                    image:''
                                }, playerId, 'Edit player', '');
                            });
                })
        }
    }

    successForm= (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({ formSuccess: '' });
            this.props.history.push('/admin_players');
        }, 2000)
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const dataToSubmit = {};
        let formIsValid = true;

        for ( let key in this.state.formData ) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if ( formIsValid ) {
            if ( this.state.formType === 'Edit player') {
                database.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Updated successfully!');
                    }).catch(e => {
                        this.setState({ formError: true });
                    });

            } else {
                firebasePlayers.push(dataToSubmit).then(() => {

                    this.props.history.push('/admin_players');
                }).catch(e => {
                    this.setState({ formError: true });
                });
            }

        } else {
            this.setState({ formError: true });
        }
    };

    onFormUpdate = (event, id, content='') => {
        const newFormData = {...this.state.formData};
        const newElement = newFormData[id];

        if ( content == '' ) {
            newElement.value = event.target.value;
        } else {
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    };

    resetImage = () => {
        const newFormData = {...this.state.formData};
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        });
    };

    storeFilename = (filename) => {
        this.onFormUpdate(null, 'image', filename)
    };

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.successForm(event)}>
                            <FileUploaderComponent 
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                onChangeHandler={this.onFormUpdate}
                            />

                            <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                onChangeHandler={this.onFormUpdate}
                            />

                            <FormField
                                id={'number'}
                                formData={this.state.formData.number}
                                onChangeHandler={this.onFormUpdate}
                            />

                            <FormField
                                id={'position'}
                                formData={this.state.formData.position}
                                onChangeHandler={this.onFormUpdate}
                            />

                            <div className="success_label">
                                { this.state.formSuccess }
                            </div>
                            {
                                this.state.formError ?
                                    <div className="error_label">
                                        Something wrong!
                                    </div>
                                    : null
                            }

                            <div className="admin_submit">
                                <button type="submit" onClick={(e) => this.onFormSubmit(e)}>{this.state.formType}</button>
                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditPlayers;