import React from "react";
import { StaticQuery, graphql } from "gatsby";
import "./styles.scss";
import { Row, Col } from "react-bootstrap";
import AnimationContainer from "components/animation-container";
import BaffleText from "components/baffle-text";
import Tilt from "react-tilt";
import ThemeContext from "../../context";
import barefoot from "../../../content/portfolio/item-1/barefoot.jpg";
import chum from "../../../content/portfolio/item-2/chum.jpg";
import sparkspan from "../../../content/portfolio/item-5/sparkspan.jpg";
import softspan from "../../../content/portfolio/item-4/softspan.jpg";

const data = [
  {
    id: 1,
    image: barefoot,
    title: "React Project (view demo)",
    category: "React.js",
    link: "https://www.youtube.com/watch?v=gDi1KMxFOBY&t=22s",
  },
  {
    id: 2,
    image: chum,
    title: "React Project (visit app)",
    category: "React.js",
    link: "https://chums.org/",
  },
  {
    id: 4,
    image: softspan,
    title: "Vue.js project (visit app)",
    category: "Vue.js",
    link: "https://soft.ambitionspan.com/",
  },

  {
    id: 5,
    image: sparkspan,
    title: "Vue.js project( private project)",
    category: "Vue.js",
  },
];
class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    const { items } = this.props;
    this.state = {
      category: null,
      col:
        items.length > 6
          ? 4
          : items.length > 4
          ? 3
          : items.length > 3
          ? 2
          : items.length > 1
          ? 2
          : 1,
      items: this.props.items,
      showPortfolio: false,
    };
    this.showPortfolio = this.showPortfolio.bind(this);
  }
  static contextType = ThemeContext;

  showPortfolio() {
    this.setState({ showPortfolio: true });
  }

  render() {
    return (
      <section
        id={`${this.props.id}`}
        className="portfolio"
        style={{ height: this.context.height }}
      >
        <Row>
          <Col md={2} className="side">
            <h2>
              <BaffleText
                text="Portfolio"
                revealDuration={500}
                revealDelay={500}
                parentMethod={this.showPortfolio}
                callMethodTime={1100}
              />
            </h2>
          </Col>
          <Col md={10} className="recent-works">
            <div className="portfolio_selector">
              <button
                className="portfolio_category"
                onClick={() => this.changeCategory(null)}
              >
                <span className={`${!this.state.category ? "active" : ""}`}>
                  All
                </span>
              </button>
              {this.categories()}
            </div>

            <div className="content">
              <div
                className="portfolio_container"
                style={{
                  maxHeight:
                    this.context.height !== "auto"
                      ? this.context.height * 0.8
                      : "inherit",
                }}
              >
                {this.items()}
              </div>
            </div>
          </Col>
        </Row>
      </section>
    );
  }

  items() {
    if (this.state.showPortfolio || this.context.height === "auto") {
      const { items } = this.state;
      return data.map((value, index) => {
        if (value.category === this.state.category || !this.state.category) {
          if (value.image) {
            return (
              <div
                className="portfolio_item"
                style={{
                  width:
                    this.context.height === "auto"
                      ? "100%"
                      : this.state.col === 4
                      ? "25%"
                      : this.state.col === 3
                      ? "33.3%"
                      : this.state.col === 2
                      ? "50%"
                      : "100%",
                }}
                key={index}
                onClick={() => {
                  if (value.link) {
                    window.open(value?.link);
                  }
                }}
              >
                <AnimationContainer delay={200} animation="fadeIn" key={index}>
                  <img
                    src={value.image}
                    alt={value.title}
                    style={{
                      maxHeight: `${
                        this.context.height *
                        (this.state.col >= 3
                          ? 0.35
                          : this.getItemCount(value.category) === 4
                          ? 0.36
                          : 1)
                      }px`,
                    }}
                  />
                  <Tilt className="Tilt" options={{ scale: 1, max: 50 }}>
                    <div className="overlay">
                      <span className="title">{value.title}</span>
                    </div>
                  </Tilt>
                </AnimationContainer>
              </div>
            );
          }
        }
        return false;
      });
    }
  }

  getItemCount(category) {
    let total = 0;
    this.state.items.forEach((v) => {
      if (v.content.frontmatter.category === category || !category) total++;
    });
    return total;
  }

  changeCategory(category) {
    const { items } = this.props;
    this.setState({ items: [] });
    let total = 0;
    items.forEach((v) => {
      if (v.content.frontmatter.category === category || !category) total++;
    });
    let col = total > 6 ? 4 : total > 4 ? 3 : total > 3 ? 2 : total > 1 ? 2 : 1;

    this.setState({ category: category, col: col });
    setTimeout(() => {
      this.setState({ items: items });
    }, 50);
  }

  categories() {
    const { items } = this.props;
    let categories = [];
    for (var v of items) {
      categories.push(v.content.frontmatter.category);
    }
    categories = [...new Set(categories)];
    return categories.map((value, index) => {
      return (
        <button
          className="portfolio_category"
          onClick={() => this.changeCategory(value)}
          key={index}
        >
          <span className={`${this.state.category === value ? "active" : ""}`}>
            {value}
          </span>
        </button>
      );
    });
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        items: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(portfolio)/" } }
          sort: { fields: [frontmatter___id], order: ASC }
          # The layout is built for 6 portfolio items #
          limit: 6
        ) {
          edges {
            content: node {
              html
              frontmatter {
                id
                title
                category
                image {
                  childImageSharp {
                    fluid(maxWidth: 2000, maxHeight: 2000) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ items }) => <Portfolio items={items.edges} {...props} />}
  />
);
