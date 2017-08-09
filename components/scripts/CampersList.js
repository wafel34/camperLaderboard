var React = require("react");

class CampersList extends React.Component {
    render() {
        return (
            <tr>
                <td className="col-sm-1">{this.props.id}</td>
                <td className="col-sm-5">
                    <a href={"http://freecodecamp.com/" + this.props.name}>
                        <img className="user-image" src={this.props.imageSrc} />
                        {this.props.name}
                    </a>
                </td>
                <td className="col-sm-3">{this.props.recent}</td>
                <td className="col-sm-3">{this.props.alltime}</td>
            </tr>
        )
    }
}

module.exports = CampersList;
