
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
    sortDays = () => {
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
    sortAllTime = () => {
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
        console.log(list[0]);
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
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr className="success">
                            <th>Id</th>
                            <th>Camper Name</th>
                            <th onClick={this.sortDays}>Points in past 30 days {(this.state.orderBy === "days") ? ((this.state.orderDays === "asc") ?<span className="glyphicon glyphicon-chevron-up"></span> : <span className="glyphicon glyphicon-chevron-down"></span>) : null}</th>
                            <th onClick={this.sortAllTime}>All time points  {(this.state.orderBy === "all") ? ((this.state.orderAll === "asc") ?<span className="glyphicon glyphicon-chevron-up"></span> : <span className="glyphicon glyphicon-chevron-down"></span>) : null}</th>
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
