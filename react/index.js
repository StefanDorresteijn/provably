import React from 'react';
import {render} from 'react-dom';
import EntryList from './components/entry_list'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.serverRequest = $.get(this.props.url, function(result) {
            this.setState({
                items: result
            })
        }.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render () {
        return <ul className="list-group">
            {this.state.items.map(function(item) {
                return (<a className="list-group-item" href={"/lottery_tools/" + item._id} key={item._id}><span className="badge">{item.winners.length}</span>{item.name}</a>)
            })}
        </ul>;
    }
}

if(document.getElementById('app'))
    render(<App url="/api/v1/lottery_tool?sortBy=endTime&limit=10&state=finished&dir=desc"/>, document.getElementById('app'));

if(document.getElementById('entry_list'))
{
    var id = $('#entry_list').data('id');
    render(<EntryList drawing_id={id} />, document.getElementById('entry_list'));
}
