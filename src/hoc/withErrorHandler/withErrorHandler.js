import React, { Component } from 'react'
import Aux from '../Auxi'
import Modal from '../../components/UI/Modals/Modals'
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }
        // componentDidMount() { we can also use constructor
        componentWillMount() {
            // console.log(axios)
            this.reqInterceptors= axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
            this.resInterceptors=axios.interceptors.response.use(res=> res, err => {
                this.setState({ error: err })
            });
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
        }
        errorRemoveHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorRemoveHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler