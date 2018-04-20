import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './KitCard.css';

class KitCard extends Component
{


    render()
    {
        // const { name } = this.props.kit;
        return (
            <Link to={"/createkit/" + this.props.kit._id}>
              <div className="kit-card">
                  <p className="paragraph-header"><span className="text-bold">Project Name:</span>{this.props.kit.kitName}</p>
                  <p><span className="text-bold">Created by: </span>{this.props.kit.createdBy.username} </p>
                  <p><span className="text-bold">Designed by: </span>{this.props.kit.createdBy.designer} </p>
              </div>
            </Link>
        );
    }
}

export default KitCard;
