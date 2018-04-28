import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './KitCard.css';
// import cardImage from './kit-image-1.jpg';


class KitCard extends Component
{

  importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  selectRandImage = () => {
    var images = [
      'https://www.shenzhen2u.com/image/cache/catalog/PCB/PCB%20Detail-500x500.jpg',
      'http://www.circuitbasics.com/wp-content/uploads/2016/06/How-to-Make-a-Custom-PCB-PCB-Final-Image.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjJgO2deXyuRoAXCZeSciWFN3UmJwnMvuvm0jQUgkt0V-kYKIP1w',
      'https://sc01.alicdn.com/kf/HTB1UMwcNpXXXXa0XVXXq6xXFXXXX/High-Quality-inverter-welding-pcb-board-inverter.jpg_350x350.jpg'
    ];

    return (images[ Math.floor(Math.random() * images.length) ]);
  }

  render()
  {
    // const images = this.importAll(require.context('../../../../uploads/kit-pics', false, /\.(png|jpe?g|svg)$/));

    return (
      <Link to={'/createkit/' + this.props.kit._id}>
        <div className="kit-card">
              
          <div className="kit-image-div">
            <div className="kit-title">
              <p className="kit-title-style">
                {this.props.kit.kitName}
              </p>
            </div>
            <img
              id="kitImage"
              src={this.selectRandImage()}
              alt="Kit-Bitz"
            />
          </div>
          <div className="kitdetails">
            <div className="kit-owner">
              <p className="kit-owner-style">
                        Created by <span id="pop-blue">{this.props.kit.createdBy.username} </span>
              </p>
            </div>
            {/* <div className="kit-designer">
                        <p className="kit-designer-style">
                        Kit designed by <span id="pop-blue">{this.props.kit.createdBy.designer} </span>
                        </p>
                    </div> */}

            <div className="kit-summary">
              <p><small className="kit-summary-style">{this.props.kit.description}</small></p>
            </div>
          </div>
        </div>
      </Link>

    );
  }
}

export default KitCard;
