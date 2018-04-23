import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './KitCard.css';
import cardImage from './kit-image-1.jpg';


class KitCard extends Component
{


    render()
    {
        // const { name } = this.props.kit;
        return (
            <Link to={"/createkit/" + this.props.kit._id}>
              <div className="kit-card">
                <div className="kit-image-container">
                        <img
                        src={cardImage}
                        alt="Kit-Bitz"
                        />
                </div>
                
                <div className="kit-title">
                    {this.props.kit.kitName}
                </div>
                <div className="kit-owner">
                     <p>
                    Created by <span id="pop-blue">{this.props.kit.createdBy.username} </span>
                    </p>
                </div>
                <div className="kit-designer">
                    <p>
                    Kit designed by <span id="pop-blue">{this.props.kit.createdBy.designer} </span>
                    </p>
                </div>
                    
                <div className="kit-summary">
                    <p><small>A specific bootloader (TinyAudioBoot) has to be installed on the chip to be able to do so.</small></p>
                </div>

             
                
                
              </div>
            </Link>
 
        );
    }
}

export default KitCard;
