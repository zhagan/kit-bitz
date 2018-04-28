import React, {Component} from 'react';
import './kit-list.css';
import KitCard from '../kit-card/kit-card';

class KitList extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    this.props;
    return (
      <div className="kit-list">
        {
          this.props.kits.map((kit) =>
          {
            return (
              <KitCard kit={kit}/>
            );
          })
        }
      </div>
    );
  }
}


export default KitList;