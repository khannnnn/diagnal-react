import React from 'react';
import Header from './Header';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import * as actions from '../actions';
import { connect } from 'react-redux';
import loader from '../assets/loader.gif';
import poster from '../assets/poster3.jpg';

class Index extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            dataList: [],
            loaded: true,
            movieCato: ''
        }
    }

    componentDidMount() {
        this.showingData();
    }

    async handleScroll() {
        if (this.props.actionList.length > 0) {
            try {
                let response;
                if (this.props.actionList.length / 20 == 1) {
                    response = await axios.get('http://localhost:3000/page2');
                    this.ListOfData(response);
                } else if (this.props.actionList.length / 20 == 2) {
                    response = await axios.get('http://localhost:3000/page3');
                    this.ListOfData(response);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    ListOfData(response) {
        let self = this;
        if (response.status == 200) {
            self.setState({
                dataList: [...this.props.actionList, ...response.data.items.content],
                loaded: false,
                movieCato: response.data.title
            })
            self.props.firstActionList([...this.props.actionList, ...response.data.items.content]);
        } else {
            self.setState({
                dataList: [],
                loaded: false,
                movieCato: ''
            })
        }
    }

    searchText() {
        console.log(this.props.actionList)
    }

    async showingData() {
        console.log("data", this.props.actionList)
        if (this.props.actionList.length > 0) {
            this.setState({
                dataList: this.props.actionList,
                loaded: false
            })
        } else {
            let self = this;
            try {
                const response = await axios.get('http://localhost:3000/page1');
                console.log(response);
                if (response.status == 200) {
                    self.setState({
                        dataList: response.data.items.content,
                        loaded: false,
                        movieCato: response.data.title
                    })
                    self.props.firstActionList(response.data.items.content);
                } else {
                    self.setState({
                        dataList: [],
                        loaded: false,
                        movieCato: ''
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    handleLanguage = (value) => {
        console.log(value)
        console.log(this.props.actionList)
        if (value != '') {
            if (this.props.actionList.length) {
                let users = this.props.actionList.filter((item) => {
                    if (item.name == value) {
                        return item
                    }
                });
                this.setState({
                    dataList: users,
                    loaded: false,
                })
            } else {
                this.setState({
                    dataList: [],
                    loaded: false,
                    movieCato: ''
                })
            }
        } else {
            this.showingData();
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="index-main-div" onMouseOut={() => this.handleScroll()}>
                <Header data={this.state.movieCato} onSelectLanguage={this.handleLanguage} />
                {
                    this.state.loaded ?
                        <div className="index-align">
                            <img src={loader} style={{ width: "50px" }} />
                        </div>
                        :
                        <Row className="index-image-div" >
                            {
                                this.state.dataList.map((item, index) =>
                                    <Col xs="4" key={index} className="mar-bottom-90">
                                        <img src={poster} className="img-size" />
                                        <div className="img-name">
                                            {item.name}
                                        </div>
                                    </Col>
                                )
                            }
                        </Row>

                }
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    firstActionList: (data) => dispatch(actions.firstMoviesList(data))
})

const mapStateToProps = state => ({
    actionList: state.firstMoviesList
})
export default connect(mapStateToProps, mapDispatchToProps)(Index);
