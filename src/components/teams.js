import React, {Component } from "react";
import {Link} from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group';

const URL_TEAMS = "http://localhost:3004/teams";


export default class teams extends Component {
    constructor(props){
        super(props);

        this.state = {
            teams : [],
            filtered:[],
            keywords:''
        }
    }

    componentDidMount(){
      fetch(URL_TEAMS, {method:'get'})
      .then(res=>res.json())
      .then((json)=>{
          this.setState({
              teams:json,
              filtered:json
          })
      })
    }

    onChangeInput= (event) => {
        const keywords = event.target.value;

        if(keywords !== ''){
            const list = this.state.teams.filter((item)=>{
                return item.name.toLowerCase().indexOf(keywords.toLowerCase()) > -1;
            })

            this.setState({
                filtered:list,
                keywords
            })
        }
        else{
            this.setState({
                filtered: this.state.teams,
                keywords
            })
        }
    }

    renderList = ({teams,filtered}) => {
        return filtered.map((item)=>{
                return(
                    <Link to={`/team/${item.name}`} key={item.id} className="team_item">
                        <img alt={item.name} src={`images/teams/${item.logo}`} />
                    </Link>
                )
            });
    }
    
  render() {
    return (
      <div className="teams_component">
        <div className="teams_input">
            <input type="text" placeholder="Search for teams" value={this.state.keywords} onChange={(e)=>this.onChangeInput(e)} />
        </div>

        <div className="teams_container">
        {
            this.renderList(this.state)
        }
        </div>
      </div>
    )
  }
}
