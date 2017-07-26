import Banner from './banner';
import MainView from './mainView';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import Tags from './Tags';

const Promise = global.Promise;

//Top Level Component to the Home Component
const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token:state.common.token
});

//This will connect the onLoad function to the compoenet props;
const mapDispatchToProps = dispatch => ({

    onLoad: (tab,payload) =>
        dispatch({type:'HOME_PAGE_LOADED',tab,payload}),
    onClickTag:(tag,payload) =>
        dispatch({type:'APPLY_TAG_FILTER',tag,payload})
})

class Home extends React.Component {
    componentWillMount() {
        const tab = this.props.token ? 'feed' : 'all';
        const articlesPromise = this.props.token ?
            agent.Articles.feed() :
            agent.Articles.all();

        this.props.onLoad(tab, Promise.all([agent.Tags.getAll(),articlesPromise]));
    }
    render() {
        return (
            <div className="home-page">

                <Banner appName={this.props.appName} />

                <div className="container page">
                    <div className="row">
                        {/*Represents the Article Section*/}
                        <MainView />

                        <div className="col-md-3">
                            <div className="sidebar">

                                <p>Popular Tags</p>

                                <Tags
                                    tags={this.props.tags}
                                    onClickTag={this.props.onClickTag}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);