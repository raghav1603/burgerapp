import React, { Component } from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 8
                },
                valid: false,
                touched: false
            },
        }
    }
    render() {
        const fromElementArray = [];
        for (let key in this.state.controls) {
            fromElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = fromElementArray.map(formElement => (            
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType='Success'>SignIN</Button>
                </form>
            </div>
        )
    }
}

export default Auth