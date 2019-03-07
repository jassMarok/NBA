import React, { Component } from 'react'

export default class subscriptions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: false,
            success: false
        }
    }

    /** Controlled Element onChange */
    onChangeInput = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    clearMessages = () => {

        //Run this after 3seconds
        /**This in setTimeout refers to setTimeout bind this to access the class state */
        setTimeout(function(){
            this.setState({
                error : false,
                success : false
            })
        }.bind(this),3000)
    } 

    /**Handle Form Submission */
    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /\S+@\S+\.\S+/;

        if(regex.test(email)){
            this.saveSubscription(email);  
        }else{
            this.setState({
                error:true
            })
        }

        //Clear any error or success messages
        this.clearMessages();
    }

    //Save subscription
    saveSubscription = (email) => {

        const URL_EMAIL = "http://localhost:3004/subcriptions";

        fetch(URL_EMAIL, {
            method:'post',
            headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email})
        }).then((res) => {
            res.json()
        })
        .then(()=>{
            this.setState({
                email:'', 
                success:true
            })
        })
    }

    render() {
        return (
            <div>

                <div className="subscribe-panel">
                    <h3>Subscribe to us</h3>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            
                            {/**Controlled Input with value set to state */}
                            <input type="email"
                            required
                            placeholder="youremail@email.com" 
                            value={this.state.email} 
                            onChange={this.onChangeInput} />

                            {/**Ternary Operator for class Change */}
                            <div className={(this.state.error)? "error show" : "error"}>Check your email</div>
                            <div className={(this.state.success) ? "success show" : "success" }>Thank You!</div>
                        </form>
                    </div>
                    <small>lorem ipsum</small>
                </div>

            </div>
        )
    }
}

