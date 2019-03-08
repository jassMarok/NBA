import React from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';


const generateBlocks = ({blocks}) => {
    if(!blocks){
        return;
    }

    return blocks.map((item)=>{
        return(
            <Fade bottom key={item.id}>
                <div className={`item ${item.type}`}>
                <div className="veil">
                    <div className="image" style={{background:`url(/images/blocks/${item.image}) no-repeat`}}
                    >

                    </div>
                    <div className="title">
                        <Link to="item.link">{item.title}</Link>
                    </div>
                </div>
                </div>
            </Fade>
        );
    })


}

const Blocks = (props) => {
    
    return (
        <div className="home_blocks">
            {
                generateBlocks(props)
            }
        </div>
    );
}

export default Blocks;