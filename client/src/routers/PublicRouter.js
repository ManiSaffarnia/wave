import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/utils/Loading';
import { authUser } from '../store/actions/user';

class PublicRouter extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.dispatch(authUser()).then(response => {
            //const user = this.props.user.userData;
            //console.log(this.props.user.userData);
            this.setState({ loading: false });
        })
    }

    render() {
        if (this.state.loading) return (<div className="main_loader"><Loading /></div>)

        return (
            (this.props.user.userData.isAuth) ?
                (
                    <Redirect to="/user/dashboard" />
                ) : (
                    <this.props.component {...this.props} user={this.props.user} />
                )
        );
    }
}//end


const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(PublicRouter);