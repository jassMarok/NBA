import React, { Component } from 'react';

const URL_POLL = "http://localhost:3004/teams";

class Poll extends Component{

    constructor(props){
        super(props);

        this.state = {
            pollTeams:[]
        }
    }

    fetchPoll() {
        

        fetch(`${URL_POLL}?poll=true&_sort=count&_order=desc`,{method:'get'})
        .then((res)=>{
            const data = res.json();
            if(res.ok !== true){
                throw { message:`An Error on fetch at ${URL_POLL}`};
            }   
            return data;
        })
        .then((json)=>{
            this.setState({pollTeams:json});
        })
        .catch((ex)=>{
            console.log(ex.message);
        })
    }

    componentDidMount(){
        this.fetchPoll();
    }

    addCount(count, id){
        const URL_TEAM = `${URL_POLL}/${id}`;
        fetch(URL_TEAM, {
            method:'PATCH',
            headers:{
                'ACCEPT':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({count:count+1})
        })
        .then(()=>{
            this.fetchPoll();
        })
    }

    renderPoll(){
        const position = ["1st", "2nd", "3rd"];
        return this.state.pollTeams.map((item, index)=>{
            return(
                <div key={item.id} className="poll_item" 
                onClick={()=>this.addCount(item.count,item.id)}>
                    <img alt={item.name} src={`/images/teams/${item.logo}`}/>
                    <h4>{position[index]}</h4>
                    <div>{item.count} Votes</div>
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