
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
            orderDays: "desc",
            orderAll: "asc",
            orderBy: "days"
        };
    }
    sortDays = (e) => {
        e.preventDefault();
        var orderBy = this.state.orderDays === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["recent"] - a["recent"]) : (a["recent"] - b["recent"]);

            });
        this.setState({
            data: result,
            orderDays: orderBy,
            orderBy: "days"
        });
    }
    sortAllTime = (e) => {
        e.preventDefault();
        var orderBy = this.state.orderAll === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["alltime"] - a["alltime"]) : (a["alltime"] - b["alltime"]);
            });
        this.setState({
            data: result,
            orderAll: orderBy,
            orderBy: "all"
        });
    }
    componentWillMount() {
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
                    id={index + 1}
                    name={item.username}
                    alltime={item.alltime}
                    recent={item.recent}
                    imageSrc={item.img}
                />
            );
        });
        return (
            <div className="container">
                <h1 className="text-center">FreeCodeCamp - Camper Laderboard</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="success">
                            <th>Id</th>
                            <th>Camper Name</th>
                            <th>
                                <a href="#" onClick={this.sortDays}>Points in past 30 days {(this.state.orderBy === "days") ?
                                    ((this.state.orderDays === "asc") ?
                                        <span className="glyphicon glyphicon-chevron-up"></span> : <span className="glyphicon glyphicon-chevron-down"></span>)
                                    : null}
                                </a>
                            </th>
                            <th>
                                <a href="#" onClick={this.sortAllTime}>All time points
                                    {(this.state.orderBy === "all") ?
                                        ((this.state.orderAll === "asc") ?<span className="glyphicon glyphicon-chevron-up"></span> : <span className="glyphicon glyphicon-chevron-down"></span>)
                                    : null}
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <footer className="text-center">
                    <span>Pawel Marcinkowski &copy; 2017</span>
                </footer>

            </div>
        );
    }
}

ReactDOM.render(<MainTable />, document.getElementById("main-interface"));
