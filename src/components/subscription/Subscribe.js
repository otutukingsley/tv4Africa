import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { pageurl } from "../../utils/constants";
import FormHeader from "../reusables/navigation/formsReusables/FormHeader";
import "./subscribe.css";

const Subscribe = () => {
  return (
    <div className="container-fluid subscribe-container">
      <header className="subscribe-header">
        <FormHeader />
      </header>
      <div className="ban-overlay">

      <div className="sub-banner">
        <p className="text-center">
          You have read the news. <br /> Now, Understand it
        </p>
      </div>
      <div className="container pay_plan-wrap">
        <h2>Pay from Nigeria</h2>
        <div className="sub-curency">
          <span className="sub-curency_ngn">NGN</span>
          <span className="sub-curency-usd">USD</span>
        </div>
        <div className="card-flex row d-flex">
          <div className="col-sm-3">
            <Card>
              <Card.Body>
                <Card.Title className="sub-crd-title text-center">Monthly Subscription</Card.Title>
                <Card.Text className="sub-crd-txt text-center">
                  1-month access to 35+ new stories analysing Nigerian
                  businesses and the economy. Billed Monthly.
                </Card.Text>
                <p className="sub-amount">N4,000</p>
                <Card.Link className="sub-signup" href="signup">Register to Subscribe</Card.Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>
              <Card.Body>
                <Card.Title className="sub-crd-title text-center">Quarterly Subscription</Card.Title>
                <Card.Text className="sub-crd-txt text-center">
                  12-month access to 300+ new stories analysing Nigerian
                  businesses and the economy. Billed Annually.
                </Card.Text>
                <p className="sub-amount">N10,000</p>
                <Card.Link className="sub-signup" href="/signup">Register to Subscribe</Card.Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>
              <Card.Body>
                <Card.Title className="sub-crd-title text-center">Annual Subscription</Card.Title>
                <Card.Text className="sub-crd-txt text-center">
                  12-month access to 300+ new stories analysing Nigerian
                  businesses and the economy. Billed Annually.
                </Card.Text>
                <p className="sub-amount">N35,000</p>
                <Card.Link className="sub-signup" href="/signup">Register to Subscribe</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Subscribe;
