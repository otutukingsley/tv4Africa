import React from 'react'
import BusinessCard from './BusinessCard'
import './business.css'
import { Link } from 'react-router-dom'
import { HtmlParseOptions } from '../../../_helper/parseNewsHtml'
import ReactHtmlParser from 'react-html-parser'
import { Row, Col, Card } from 'react-bootstrap'
import { LargeSizeAds } from '../ads/Ads'
import bannerAds from '../../../assets/images/bannerads.png'
import '../ads/ads.css'

const Business = (props) => {
  let isAuth = false

  const businessNews =
    props.data && props.data.filter((news) => news.category_id === 'Business')
  

  const handlePrem = (e) => {
    if (!isAuth) {
      e.preventDefault()
      alert('Subscribe')
    }
  }
  return (
    <section className="business-section">
      <div className="business-wrapper">
        <h5 className="business-heading">Business and Economy</h5>
        <div className="business-content">
          <Row xs={1} lg={3} className="g-4">
            {businessNews.slice(3, 6).map((categ, idx) => (
              <Col className="bus-col" key={categ.id}>
                <Link
                  to={`/post/${categ.slug}`}
                  className="bus-link"
                  onClick={(e) => {
                    if (categ.post_type === 'premium') {
                      handlePrem(e)
                    }
                  }}
                >
                  <Card className="bus-card">
                    <Card.Img
                      variant="top"
                      src={`https://api.tv24africa.com/public/storage/post_image/${categ.featured_image}`}
                      className="mb-3 card-img-business"
                    />
                    <Card.Body className="bus-card-body">
                      <Card.Subtitle className="text-danger mb-3">
                        {categ.slug}
                      </Card.Subtitle>
                      <Card.Text>
                        {ReactHtmlParser(
                          `${categ.post_description.substring(0, 130)}...`,
                          HtmlParseOptions,
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
        <Link
          to={{
            pathname: '/news/categories',
            search: `?category=Business`,
          }}
          className="more-business"
        >
          Explore More...
        </Link>
        <div className="ad-sense mt-5"><LargeSizeAds img={bannerAds} /></div>
      </div>
    </section>
  )
}

export default Business
