
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

        //depend of the state of orderDays map the data array and sort ascending or desceding by resent rank

        var orderBy = this.state.orderDays === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["recent"] - a["recent"]) : (a["recent"] - b["recent"]);

            });
        this.setState({
            data: result,
            orderDays: orderBy,
            orderBy: "days"
        });
    } //sort by last 30 days

    sortAllTime = (e) => {
        e.preventDefault();

        //depend of the state of orderAll map the data array and sort ascending or desceding by all time rank

        var orderBy = this.state.orderAll === "asc" ? "desc" : "asc",
            result = this.state.data.sort((a,b) => {
                return (orderBy === "desc") ? (b["alltime"] - a["alltime"]) : (a["alltime"] - b["alltime"]);
            });
        this.setState({
            data: result,
            orderAll: orderBy,
            orderBy: "all"
        });
    } //sort by all time rank

    componentWillMount() {

        //get the data from external file and set data to it's value

        var url = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
        this.serverRequest = $.get(url, (result) => {
            this.setState({
                data: result
            });
        });
    }
    render() {
        var list = this.state.data;

        // map the data array and return table-row elements (Campers list) with props.
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
                                { /*After onClick: check if 'orderBy' state is equal to 'days' if yes* add a span to this <th> if not, null
                                    //*when adding span, check if value is 'asc' or not and add relevant icon*/}
                                <a href="#" onClick={this.sortDays}>Points in past 30 days {(this.state.orderBy === "days") ?
                                        <span className={(this.state.orderDays === "asc") ? " glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
                                    : null}
                                </a>
                            </th>
                            <th>
                                { /*After onClick: check if 'orderBy' state is equal to 'all' if yes* add a span to this <th> if not, null
                                    //*when adding span, check if value is 'asc' or not and add relevant icon*/}
                                <a href="#" onClick={this.sortAllTime}>All time points {(this.state.orderBy === "all") ?
                                        <span className={(this.state.orderAll === "asc") ? " glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
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
    } // render
}

ReactDOM.render(<MainTable />, document.getElementById("main-interface"));
