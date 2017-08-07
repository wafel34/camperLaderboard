
var $ = window.jQuery = require("jQuery"),
    React = require("react"),
    ReactDOM = require("react-dom"),
    bootstrap = require("bootstrap-sass");

var CampersList = require("./CampersList");


class MainTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            orderDays: "asc",
            orderAll: "asc"
        };
    }
    sortDays = () => {
        var orderBy = this.state.orderDays === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["recent"] - a["recent"]) : (a["recent"] - b["recent"]);

            });
        this.setState({
            data: result,
            orderDays: orderBy
        });
    }
    sortAllTime = () => {
        var orderBy = this.state.orderAll === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["alltime"] - a["alltime"]) : (a["alltime"] - b["alltime"]);
            });
        this.setState({
            data: result,
            orderAll: orderBy
        });
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
                            <th onClick={this.sortDays}>Points in past 30 days</th>
                            <th onClick={this.sortAllTime}>All time points</th>
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
