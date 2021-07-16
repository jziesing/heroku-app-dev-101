import React from 'react';


let ajax = require('superagent');




class HomePage extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            isLoading: false,
            btnClicked: false,
            things: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleMakeData = this.handleMakeData.bind(this);
	}

    handleFormSubmit(event)  {
        this.setState({isLoading: true});
        let fetchThingsURL = '/fetch/things/';
        ajax.get(fetchThingsURL)
        	.end((error, response) => {
          		if (!error && response) {
                    console.log(JSON.parse(response.text));
                    this.setState({things: JSON.parse(response.text)});

          		} else {
              		console.log(`Error fetching data`, error);
          		}
                this.setState({btnClicked: true});
                this.setState({isLoading: false});
        	});
    }

    handleMakeData() {
        this.setState({isLoading: true});
        let startJobURL = '/jobs/run/make-things';
        ajax.post(startJobURL)
			.set({ 'Content-Type': 'application/json' })
			.send({})
        	.end((error, response) => {
          		if (!error && response) {

	                console.log(this.state);
                    console.log(response.text);
                    // this.setState({things: JSON.parse(response.text)});

          		} else {
              		console.log(`Error fetching data`, error);
          		}
                this.setState({btnClicked: true});
                this.setState({isLoading: false});
        	});
    }

    btnMarkup() {
		if(this.state.isLoading) {
			return (
				<form class="form-horizontal" action="">
					<div class="form-group">
						<i class="fa fa-spinner fa-spin loadingCon" />
					</div>
					<div class="form-group">
						<button type="button" class="btn btn-cSend disabled">Get Data</button>
					</div>
					<div class="form-group">
						<button type="button" class="btn btn-cSend disabled">Make Data</button>
					</div>
				</form>
			);
		} else {
			return (
				<form class="form-horizontal">
					<div class="form-group">
						<button type="button" onClick={this.handleFormSubmit} class="btn btn-cSend">Get Data</button>
					</div>
					<div class="form-group">
                        <button type="button" onClick={this.handleMakeData} class="btn btn-cSend">Make Data</button>
					</div>
				</form>
			);
		}
	}


    tableData() {

        return this.state.things.map((thing, index) => {
            return (
                <tr key={index}><td>{thing.id}</td><td>{thing.title}</td><td>{thing.description}</td></tr>
            );
        });

    }

    dataMarkup() {

        if(this.state.btnClicked) {
            return (
                <table class="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  this.tableData() }
                    </tbody>
                </table>
            )
        } else {
            return null;
        }
    }

	render() {



        return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>Heroku Intro</h1>
                        <p>Now click the button to get data from your database..</p>
	                </div>
		    	</div>
                <div class="row">
                    <div class="text-center">
                        { this.btnMarkup() }
                    </div>
                </div>
                <div class="row">
                    <div class="text-center">
                        { this.dataMarkup() }
                    </div>
                </div>
            </div>
		);
	}
}

export default HomePage;
