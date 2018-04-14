import React, {Component} from 'react';
import './kit-card.css';

class KitCard extends Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        const {url, name, likes} = this.props.kit;
        return (
            <div className="kit-card">
                <img src={url}/>
                <p className="paragraph-header"><span className="text-bold">Project Name:</span>{name}</p>
                <p><span className="text-bold">Likes</span> {likes}</p>
            </div>
        );
    }
}

export default KitCard;