import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import BaffleText from "components/baffle-text";
import AnimationContainer from "components/animation-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faAngular,
  faAws,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPencilRuler,
  faServer,
  faRobot,
  faSmileBeam,
  faPizzaSlice,
  faQuoteRight,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import Counter from "components/counter";
import ThemeContext from "../../context";
import "./styles.scss";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.show = this.show.bind(this);
  }

  static contextType = ThemeContext;

  show() {
    this.setState({ show: true });
  }

  render() {
    return (
      <section
        id={`${this.props.id}`}
        className="services"
        style={{ height: this.context.height }}
      >
        <Row
          className="top"
          style={{
            maxHeight:
              this.context.height !== "auto"
                ? this.context.height * 0.8
                : "inherit",
          }}
        >
          <div className="content">
            <Col md={12}>
              <div className="line-text">
                <h4>Services</h4>
              </div>
              <div className="heading">
                <BaffleText
                  text="What I Do"
                  revealDuration={500}
                  revealDelay={500}
                  parentMethod={this.show}
                  callMethodTime={1100}
                />
              </div>
              <div
                className="services_container"
                style={{
                  minHeight:
                    this.context.height !== "auto"
                      ? this.context.height * 0.6
                      : "inherit",
                }}
              >
                <Container>{this.services()}</Container>
              </div>
            </Col>
          </div>
        </Row>
        <Row className="bottom">{this.counters()}</Row>
      </section>
    );
  }

  services() {
    if (this.state.show || this.context.height === "auto") {
      return (
        <Row>
          <Col md={4} className="service">
            <AnimationContainer delay={200} animation="fadeInLeft fast">
              <div className="icon">
                <FontAwesomeIcon icon={faReact} />
              </div>
              <h4>Front-end React</h4>
              <p>
                over three years of experience working as React/Redux developer.
                I have been developing pixel perfect reusable components with
                high proficiency in JavaScript and DOM manipulation
              </p>
            </AnimationContainer>
          </Col>
          <Col md={4} className="service border-side">
            <AnimationContainer delay={400} animation="fadeInDown fast">
              <div className="icon">
                <FontAwesomeIcon icon={faVuejs} />
              </div>
              <h4>Vue.js Web App</h4>
              <p>
                since October 2021 I have been working on Vuejs projects, I am
                able to develop beautiful responsive components and integrating
                with Restful APIs
              </p>
            </AnimationContainer>
          </Col>
          <Col md={4} className="service">
            <AnimationContainer delay={600} animation="fadeInRight fast">
              <div className="icon">
                <FontAwesomeIcon icon={faAws} />
              </div>
              <h4>AWS Management</h4>
              <p>
                I am familiar with some of AWS services Which are EC2 instance,
                AWS Amplify, AWS S3 bucket, Elastic beanstalk and AWS Route 53
              </p>
            </AnimationContainer>
          </Col>
        </Row>
      );
    }
  }

  counters() {
    if (this.state.show || this.context.height === "auto") {
      return <Container></Container>;
    }
  }
}

export default Services;
