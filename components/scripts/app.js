
var $ = window.jQuery = require("jQuery"),
    React = require("react"),
    ReactDOM = require("react-dom"),
    bootstrap = require("bootstrap-sass");

var CampersList = require("./CampersList");


class MainTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
        this.serverRequest = $.get(url, (result) => {
            this.setState({
                data: result
            });
        });
    }
    render() {
        var list = this.state.data;
        list = list.map((item, index) => {
            console.log(item);
            return (
                <CampersList
                    key={index}
                    id={index}
                    name={item.username}
                    alltime={item.alltime}
                    recent={item.recent}
                />
            );
        });
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Camper Name</th>
                            <th>Points in past 30 days</th>
                            <th>All time points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<MainTable />, document.getElementById("main-interface"));
