import React, { Component } from 'react';
import AdminLayout from '../Hoc/adminlayout';
import FormField from '../ui/formFields';
import { validate } from '../ui/misc';
import database, { firebaseMatches, firebaseTeams }  from '../../firebase/firebase';
import { firebaseLooper } from '../ui/misc';

class AddEditMatch extends Component {
    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Label',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select an away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [ 
                        {key:'W', value:'W'},
                        {key:'L', value:'L'},
                        {key:'D', value:'D'},
                        {key:'N/A', value:'N/A'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game played?',
                    name: 'select_played',
                    type: 'select',
                    options: [ 
                        {key:'Yes', value:'Yes'},
                        {key:'No', value:'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }

    }

    onFormUpdate = (event, id) => {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[id]};
        newElement.value = event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log('submit clicked..')
    }

    updateFields = (match, teamOptions, teams, formType, matchId) => {
        const newFormData = {...this.state.formData};
        for ( let key in newFormData ) {
            if ( match ) {
                newFormData[key].value = match[key];
                newFormData[key].valid = true;
            }
            if ( key === 'local' || key === 'away' ) {
                newFormData[key].config.options = teamOptions;
            }
        }
        this.setState({
            matchId, 
            formType,
            formData: newFormData,
            teams 
        });
    };

    componentDidMount = () => {
        const matchId = this.props.match.params.id;
        const getTeams = (match, type) => {
            firebaseTeams.once('value').then(snapshot => {
                const teams = firebaseLooper(snapshot);
                const teamOptions = [];
                
                snapshot.forEach((childSnapshot) => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    });
                });
                this.updateFields(match, teamOptions, teams, type, matchId);
            });
        };
        
        if ( !matchId ) {

        } else {
            database.ref(`matches/${matchId}`).once('value')
                .then(snapshot => {
                    const match = snapshot.val();
                    getTeams(match, 'Edit Match');
                }) 
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.onFormSubmit(event)}>
                            <FormField
                                id={'date'}
                                formData={this.state.formData.date}
                                onChangeHandler={this.onFormUpdate}
                            />

                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            onChangeHandler={this.onFormUpdate}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            onChangeHandler={this.onFormUpdate}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            onChangeHandler={this.onFormUpdate}
                                        />
                                    </div>

                                    <div>
                                        <FormField
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            onChangeHandler={this.onFormUpdate}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    onChangeHandler={this.onFormUpdate}
                                />

                                <FormField
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    onChangeHandler={this.onFormUpdate}
                                />
                            </div>

                            <div className="split_fields last">
                                <FormField
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    onChangeHandler={this.onFormUpdate}
                                />

                                <FormField
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    onChangeHandler={this.onFormUpdate}
                                />
                            </div>

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
                                <button type="submit">{this.state.formType}</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
                
            </AdminLayout>
        );
    }
}

export default AddEditMatch;