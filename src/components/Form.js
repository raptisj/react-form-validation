import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { withRouter } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNameValid: false,
            isEmailValid: false,
            isPhoneValid: false,
            isUrlValid: false,
            readyToSubmit: false,
            currentUser: []
        };
        this.checkForm = this.checkForm.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
         fetch('http://localhost:3004/users')
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({ currentUser: data }) 
        })
    }

    checkForm() {
        const inputs = document.querySelectorAll('.contact-form input');
        let trues = [];
        const { errorMsg, hideErrorMsg } = this.props;

        const patterns = {
            name: /^[a-z\d _]{3,22}$/i,
            email: /^([a-z\d\.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
            phone: /^\d{1,26}$/,
            url: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
        }

         const validate = (field, regex) => {
           
            if(regex.test(field.value)){
                console.log('valid')
                field.classList.remove('error')
                if(field.name === 'name') {
                    this.setState({ isNameValid: true });
                    trues.push(this.state.isNameValid)
                } else if(field.name === 'email') {
                    this.setState({ isEmailValid: true });
                    trues.push(this.state.isEmailValid)
                } else if(field.name === 'phone') {
                    this.setState({ isPhoneValid: true });
                    trues.push(this.state.isPhoneValid)
                } else if(field.name === 'url') {
                    this.setState({ isUrlValid: true });
                    trues.push(this.state.isUrlValid)
                }
            } else {
                console.log('invalid')
                if(field.name === 'name') {
                    field.classList.add('error')
                } else if(field.name === 'email') {
                    field.classList.add('error')
                } else if(field.name === 'phone') {
                    field.classList.add('error')
                } else if(field.name === 'url') {
                    field.classList.add('error')
                }
            }
        }
            
        Array.from(inputs).forEach((input) => {
             validate(input, patterns[input.name])
        })

        if(trues.length === inputs.length) {
            hideErrorMsg()
            this.setState( state => {
                return { readyToSubmit: true } 
            })
        } else {
            errorMsg()
        }
    }

    handleLogin() {
         const inputs = document.querySelectorAll('.contact-form input');

         let beValid = this.state.currentUser.map(user => {
            return user.phone
        })

        if(Number(beValid) == inputs[2].value) {
            const { history } = this.props;
            if(history) history.push('/dash');
        } else {
            console.log('no')
        }
    }

    render() {
        return (
            <div className="row">
            <h1 className="form-header">Form Validation</h1>
            <form onSubmit={e => e.preventDefault()} className="contact-form">
                <div className="input-fields">
                    <label> Name: </label>
                    <input type="text" name="name" />
                </div>
                <div className="input-fields">
                    <label> Email: </label>
                    <input type="email" name="email" />
                </div>
                <div className="input-fields">   
                    <label>Phone: </label>
                    <input type="number" name="phone" />
                </div>
                <div className="input-fields">
                    <label>Blog URL:</label>
                    <input type="text" name="url" />
                </div>

                <div className="verify__btn">
                    {this.state.readyToSubmit
                     ? <a href="#" onClick={this.handleLogin} className="btn btn--success">Submit</a> 
                     : <a href="#" onClick={this.checkForm} className="btn">Verify</a>}
                </div>
            </form>
        </div>
        );
    }
}

export default withRouter(Form);