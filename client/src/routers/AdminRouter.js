import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/utils/Loading';
import { authUser } from '../store/actions/user';

class AdminRouter extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.dispatch(authUser()).then(response => {
            this.setState({ loading: false });
        })
    }

    render() {
        if (this.state.loading) return (<div className="main_loader"><Loading /></div>)

        return (
            (this.props.user.userData.isAuth && this.props.user.userData.isAdmin) ? (
                <this.props.component {...this.props} user={this.props.user.userData} />
            ) : (this.props.user.userData.isAuth ? <Redirect to="/user/dashboard" /> : <Redirect to="/register_login" />)
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminRouter);

