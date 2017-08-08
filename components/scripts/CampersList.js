var React = require("react");

class CampersList extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>
                    <a href={"http://freecodecamp.com/" + this.props.name}>
                        <img className="user-image" src={this.props.imageSrc} />
                        {this.props.name}
                    </a>
                </td>
                <td>{this.props.recent}</td>
                <td>{this.props.alltime}</td>
            </tr>
        )
    }
}

module.exports = CampersList;
