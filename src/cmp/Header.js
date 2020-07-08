import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Back from '../assets/Back.png';
import Search from '../assets/search.png';

class Header extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleLangChange = (value) => {
        this.props.onSelectLanguage(value);
    }

    render() {
        console.log("Header", this.props.data)
        return (
            <React.Fragment>
                <Row className="header-div fixed-top">
                    <Col xs="6">
                        <img src={Back} width="20px" height="20px" className="pointer" title="Back..!" />
                        <span className="mar-left-10">{this.props.data}</span>
                    </Col>
                    <Col xs="6" className="text-right">
                        <input type="text" name="search"
                            placeholder="Search.." className="search-text"
                            onChange={(e) => this.handleLangChange(e.target.value)}
                        />
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Header;