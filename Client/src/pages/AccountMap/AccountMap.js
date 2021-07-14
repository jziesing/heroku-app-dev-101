import React from 'react';


let ajax = require('superagent');




class AccountMap extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            isLoading: false,
            btnClicked: false
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

    componentWillMount() {

        // let fetchAccountsURL = '/fetch/accounts/';
        // ajax.get(fetchAccountsURL)
        // 	.end((error, response) => {
        //   		if (!error && response) {
        //             console.log(JSON.parse(response.text));
	    //           	this.setState({
	    //             	parentAccounts: JSON.parse(response.text),
        //                 searchParentAccounts: JSON.parse(response.text)
	    //         	});
        //   		} else {
        //       		console.log(`Error fetching data`, error);
        //   		}
        // 	});
  	}

    handleFormSubmit(event)  {
        this.setState({btnClicked: true});
    }

    btnMarkup() {
		if(this.state.isLoading) {
			return (
				<form class="form-horizontal" action="">
					<div class="col-sm-offset-4 col-sm-4">
						<i class="fa fa-spinner fa-spin loadingCon" />
					</div>
					<div class="form-group">
							<button type="button" class="btn btn-cSend disabled">Get Data</button>
					</div>
				</form>
			);
		} else {
			return (
				<form class="form-horizontal">
					<div class="form-group">
							<button type="button" onClick={this.handleFormSubmit} class="btn btn-cSend">Get Data</button>
					</div>
				</form>
			);
		}
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
                        <tr>
                            <th>#</th>
                            <th>Not</th>
                            <th>Yet</th>
                        </tr>
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
                        <p>you deployed a heroku web app!</p>
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

export default AccountMap;
