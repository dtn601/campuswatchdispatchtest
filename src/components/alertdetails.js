import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class AlertDetails extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      redirectTo: null,
      markers: {},
      loaded: false
    }
    
    this.handleClick = this.handleClick.bind(this);
  }



  componentWillMount(){
    setTimeout(()=>this.setState({loaded:true}),500)
    this.setState({
      markers: this.props.data
    })
  }

  handleClick(e){
    e.preventDefault()
    console.log('clicked', this.state.key)
    this.setState({ redirectTo: '/chat' })


  }

	render(){

    if (this.state.loaded === true){

    function Cat(props){
      const category = props.category
        switch(category) {
        case 0:
            return <h4>Emergency</h4>
            break;
        case 1:
            return <h4>Mass Public Threat</h4>
            break;
        case 2:
            return <h4>Fire</h4>
            break; 
        case 3:
            return <h4>Holdup</h4>
            break;
        case 4:
            return <h4>Panic</h4>
            break;
        case 5:
            return <h4>Theft</h4>
            break;  
        case 6:
            return <h4>Harassment</h4>
            break; 
        case 7:
            return <h4>Suspicious Activiy</h4>
            break;
        case 8:
            return <h4>Safety Hazard</h4>
            break;
        case 9:
            return <h4>Maintenance</h4>
            break;
        default:
            return <h4>{category}</h4>       
        }
    }

    function CatStyle(props){
      const category = props.category
        switch(category) {
        case 0:
            return <div className="col-xs-1 category" style={{backgroundColor: 'red'}}></div>
            break;
        case 1:
            return <div className="col-xs-1 category" style={{backgroundColor: 'red'}}></div>
            break;
        case 2:
            return <div className="col-xs-1 category" style={{backgroundColor: 'orangered'}}></div>
            break; 
        case 3:
            return <div className="col-xs-1 category" style={{backgroundColor: 'orange'}}></div>
            break;
        case 4:
            return <div className="col-xs-1 category" style={{backgroundColor: 'orange'}}></div>
            break;
        case 5:
            return <div className="col-xs-1 category" style={{backgroundColor: 'yellow'}}></div>
            break;  
        case 6:
            return <div className="col-xs-1 category" style={{backgroundColor: 'yellow'}}></div>
            break; 
        case 7:
            return <div className="col-xs-1 category" style={{backgroundColor: 'yellow'}}></div>
            break;
        case 8:
            return <div className="col-xs-1 category" style={{backgroundColor: 'grey'}}></div>
            break;
        case 9:
            return <div className="col-xs-1 category" style={{backgroundColor: 'grey'}}></div>
            break;
          default:
           return <div className="col-xs-1 category" style={{backgroundColor: 'grey'}}></div> 
        }
    }


		return( 
        <div key={this.props.keys}>
        { this.state.redirectTo ?
            <Redirect to={{ pathname: this.state.redirectTo, state: {...this.state.markers} }} /> : 
            (
        <div className="col-xs-12 alert" onClick={this.handleClick}>
                  <CatStyle category={this.props.data.details.category}/>
                  <div className="col-xs-12 alertdetails">
                    <div className="col-xs-12">
                      <Cat category={this.props.data.details.category}/>
                    </div>
                    <div className="col-xs-6">
                      <p>{this.props.data.details.time}</p>
                    </div>
                    <div className="col-xs-6">
                      <p>{this.props.data.details.date}</p>
                    </div>
                    <div className="col-xs-6">
                      <p>{this.props.data.user.name}</p>
                    </div>
                    <div className="col-xs-6">
                      <p>{this.props.data.location.postalcode}</p>
                    </div>
                  </div>

              </div>
              )}
            </div>
        

			)
    } else {
      return (<div><p></p></div>)
    }
	}


}


