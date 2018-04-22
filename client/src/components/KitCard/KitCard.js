import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './KitCard.css';

class KitCard extends Component
{

  importAll = (r) => {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }


    render()
    {
      const images = this.importAll(require.context('../../../../uploads/kit-pics', false, /\.(png|jpe?g|svg)$/));

        return (
            <Link to={"/createkit/" + this.props.kit._id}>
              <div className="kit-card">
                <img src={images[this.props.kit.kitImgPath.name]} />
                  <p className="paragraph-header"><span className="text-bold">Project Name:</span>{this.props.kit.kitName}</p>
                  <p><span className="text-bold">Created by: </span>{this.props.kit.createdBy.username} </p>
                  <p><span className="text-bold">Designed by: </span>{this.props.kit.designer} </p>
              </div>
            </Link>
        );
    }
}

export default KitCard;
