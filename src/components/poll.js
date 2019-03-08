import React, { Component } from 'react';

class Poll extends Component{

    constructor(props){
        super(props);

        this.state = {
            pollTeams:''
        }
    }

    fetchPoll() {
        const URL_POLL = "http://localhost:3004/teams";

        fetch(`${URL_POLL}?poll=true&_sort=count&_order=desc`,{method:'get'})
        .then(res=>res.json())
        .then((json)=>{
            this.setState({pollTeams:json});
            console.log(this.state);
        })
    }

    componentDidMount(){
        this.fetchPoll();
    }

    renderPoll(){

        if(!this.state.pollTeams){
            return;  
        }
        return this.state.pollTeams.map((item)=>{
            return(
                <div key={item.id} className="poll_item">
                    <img alt={item.name} src={`/images/teams/${item.logo}`}/>
                </div>
            );
        })
    }



    render(){
        return(
            <div className="home_poll">
                <h3>Who will be the next champion ?</h3>
                <div className="poll_container">
                    {this.renderPoll()}
                </div>
            </div>
        );
    }
}

export default Poll;