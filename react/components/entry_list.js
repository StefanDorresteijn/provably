import React from 'react';
import {render} from 'react-dom';

export default class EntryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            ticket_id: '',
            secret_key: '',
            email: ''
        }
        this.addEntry = this.addEntry.bind(this);
    }

    componentWillMount() {
        console.log(this.props.drawing_id);
        console.log("Component Will Mount");
        this.serverRequest = $.get("/api/v1/lottery_tool/57ee6bd74fbe391702b31594", function(result) {
            this.setState({
                entries: result.entries
            });
        }.bind(this));
    }

    addEntry(e) {
        e.preventDefault();
        var self = this;
        $.ajax({
            url: "/api/v1/lottery_tool/"+ self.props.drawing_id +"/add_entry",
            dataType: 'json',
            type: 'POST',
            data: {ticket_id: this.state.ticket_id, secret_key: this.state.secret_key, email: this.state.email},
            cache: false,
            success: function(data) {
                this.setState({entries: this.state.entries.concat(data)});
                console.log("Data received");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-8">
                    <h3>Entries<small> ({this.state.entries.length})</small></h3>
                    <ul className="list-group">
                        {this.state.entries.map(function (entry) {
                            return <li className="list-group-item" key={entry._id}>{entry.ticketId === undefined ? entry._id : entry.ticketId}</li>
                        })}
                    </ul>
                </div>
                <div className="col-md-4">
                    <p>To add an entry, please fill in the secret key and email you used to create this lottery.</p>
                    <form action="" method="post" onSubmit={this.addEntry}>
                        <div className="form-group">
                            <label htmlFor="ticket_id">Ticket ID</label>
                            <input id="ticket_id" type="text" name="ticket_id" className="form-control" onChange={ (e) => this.setState({ ticket_id: e.target.value }) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secret_key">Secret Key</label>
                            <input id="secret_key" type="text" name="secret_key" className="form-control" onChange={ (e) => this.setState({ secret_key: e.target.value }) } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secret_key">Email</label>
                            <input id="email" type="email" name="email" className="form-control" onChange={ (e) => this.setState({ email: e.target.value }) } />
                        </div>
                        <button type="submit" className="btn btn-default">Add Entry</button>
                    </form>
                </div>
            </div>
        );
    }
}