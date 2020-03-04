import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "@okta/okta-react";

import styled from "styled-components";
import Header from "./pages/Header.js";
import Trending from "./trendingCities/Trending.js";
import MarketingBox from './MarketingBox.js';
import NavBar from './NavBar.js';

export default withAuth(
  class LandingPage extends Component {
    state = { authenticated: null };
    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };
    async componentDidMount() {
      this.checkAuthentication();
    }
    async componentDidUpdate() {
      this.checkAuthentication();
    }
    render() {
      return (
        <div>
          <NavBar {...this.props}/>
          <Header/>
          <Trending/>
          <MarketingBox/>
        </div>
      );
    }
  }
);
