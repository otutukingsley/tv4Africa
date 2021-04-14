import React, { Component } from "react";
import PoliticsAndGovernanceCard from "./PoliticsAndGovernanceCard";
import ReaderList from "./ReaderList";
import "./politicsandgovernance.css";
import { Link } from "react-router-dom";
import { ExploreMore } from "../ExploreMore";

// THE FIRST FRONTEND GUY MADE SEVERAL CONFUSING NAMING CONVENTION 
// THIS COMPONENT HAS BEEN CHANGED TO POLITICS COMPONENT

class PoliticsAndGovernance extends Component {
  render() {
    const feeds = this.props.data;
    const getPoliticsNews = feeds && feeds.filter(
      (news) => news.category_id === "Politics and Governance"
    );
    const getPremiumNews = getPoliticsNews && getPoliticsNews.filter(
      (newsHD) => newsHD.post_type === "free"
    );
    return (
      <div className="politics">
        <div className="custom-container container-fluid hl-tp-cont mx-auto">
          <div className="row container-fluid mx-auto">
            <div className="col-12 col-md-12 col-lg-9 ns-txt-wrap">
            <Link to="/">
              <label className="politics-category-heading">Politics and Governance</label>
            </Link>
              { getPremiumNews && getPremiumNews.length &&
                getPremiumNews.slice(0, 3).map((news) => {
                  const {
                    post_title,
                    id,
                    slug,
                    featured_image,
                    category_id,
                    post_description,
                  } = news;
                  return (
                    <PoliticsAndGovernanceCard
                      key={id}
                      post_title={post_title}
                      slug={slug}
                      featured_image={featured_image}
                      category_id={category_id}
                      post_description={post_description}
                    />
                  );
                })}
            </div>
            <div className="col-12 col-md-10 col-lg-3 mx-auto must-read-container">
              {/* <h2>MUST READ</h2> */}
              <div>
                {feeds && feeds.length &&
                  feeds.slice(0, 4).map((news) => {
                    const { slug, post_title, id, created_at, post_description, post_type} = news;
                    return <ReaderList 
                            key={id} 
                            slug={slug} 
                            post_title={post_title}
                            post_description={post_description}
                            created_at={created_at}
                            post_type={post_type}
                          />;
                  })}
              </div>

              <div className="politics-ads">
                <span>Ads</span>
              </div>
            </div>
            <div className="explore-more-politics">
              <ExploreMore />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PoliticsAndGovernance;