var React = require("react");

class CampersList extends React.Component {
    render() {
        return (
            <tr>
            <td>{this.props.id}</td>
            <td>{this.props.name}</td>
            <td>{this.props.alltime}</td>
            <td>{this.props.recent}</td>
            </tr>
        )
    }
}

module.exports = CampersList;
