import React, { useEffect, useState, Fragment, useContext } from 'react'
import CommentForm from './CommentForm'
import ShareNews from './ShareNews'
import bannerAds from './../../assets/images/bannerads.png'
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
} from 'react-html-parser'
import { marked } from 'marked'
import Nav from '../reusables/navigation/Nav/nav'
import Footer from '../reusables/navigation/Footer/footer'
import { useParams, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {
  getNewsComments,
  getNewsFeed,
  getSingleNews,
} from '../../context/news/NewsApi'
import Loader from '../loader/Loader'
import './allNews.css'
import NewsComments from './NewsComments'
import {
  FreeReaderPersuader,
  ContinueReadingWithAuth,
  ContinueReadingWithSubscription,
  NotLoggedIn,
  LoggedInNotSubscribed,
} from './FreeReaderPersuader'
import { PopulateReadersList } from '../homepage/politics/ReaderList'
import { ContactsAds1 } from '../ContactUs/mainSection/ContactsAds'
import { formatDate } from '../../_helper/dateFormatter'
import authContext from '../../context/auth/authContext'
import newsContext from '../../context/news/NewsContext'
import { LargeSizeAds } from '../homepage/ads/Ads'
import { addView } from './postView'
import { Row, Col, Card } from 'react-bootstrap'

function transform(node, index) {
  if (node.type === 'tag' && node.name === 'span') {
    return null
  }
  if (node.type === 'tag' && node.name === 'ul') {
    node.name = 'ol'
    return convertNodeToElement(node, index, transform)
  }

  if (node.type === 'tag' && node.name === 'b') {
    return <i key={index}>{processNodes(node.children, transform)}</i>
  }
  if (node.type === 'tag' && node.name === 'a') {
    node.attribs.target = '_blank'

    return convertNodeToElement(node, index, transform)
  }

  if (node.type === 'tag' && node.name === 'button') {
    return (
      <Button variant="contained" color="primary" key={index}>
        {processNodes(node.children, transform)}
      </Button>
    )
  }
}

const options = {
  decodeEntities: true,
  transform,
}

const GetNews = () => {
  const userContext = useContext(authContext)
  const { user } = userContext
  const newsFeedContext = useContext(newsContext)
  const {
    news,
    loading,
    singleNews,
    error,
    getNews,
    getSingleNews,
  } = newsFeedContext

  // const [news, setNews] = useState(null)
  // const [categoryNews, setCategoryNews] = useState(null)
  const [comments, setComments] = useState(null)
  const [hasSubscription, setHasSubscription] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')
  const { slug } = useParams()

  let loggedin = false
  let subscription = false

  // useEffect(() => {
  //   // set the user subscription status
  //   if (user) {
  //     setHasSubscription(user.hasSubscribed)
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (news && categoryNews) {
  //     const newsWithCurrentCategory = categoryNews?.filter(
  //       (sameCateNews) => sameCateNews.category_id === news?.category_id,
  //     )
  //     const removeCurrentNews = newsWithCurrentCategory?.filter(
  //       (otherNews) => otherNews.id !== news?.id,
  //     )
  //     const randomNews = Math.floor(Math.random() * removeCurrentNews?.length)
  //     randomNews && setNextPost(removeCurrentNews[randomNews])
  //     removeCurrentNews && setPreviousPost(removeCurrentNews[0])
  //   }
  // }, [news, categoryNews])

  const getAdjacentPosts = (slug) => {
    if (singleNews.length === 0) return ''
    const currentCategoryNews = news.filter(
      (news) => news.category_id === singleNews[0].category_id,
    )
    const postIndex = currentCategoryNews.findIndex(
      (postHeader) => postHeader?.slug === slug,
    )
    console.log(postIndex)

    return {
      previous:
        postIndex <= 0
          ? ''
          : {
              slug: currentCategoryNews[postIndex - 1].slug,
            },
      next:
        postIndex >= currentCategoryNews.length - 1
          ? ''
          : {
              slug: currentCategoryNews[postIndex + 1].slug,
            },
    }
  }

  useEffect(() => {
    getSingleNews(slug)
    getNews()
  }, [slug])

  // useEffect(() => {
  //   if (news) {
  //     // Add post view
  //     addView(news.id)
  //   }
  // }, [news])

  // useEffect(() => {
  //   // get the readers list   news
  //   getNewsFeed().then((data) => {
  //     setCategoryNews(data)
  //     setLoading(false)
  //   })
  // }, [])

  // useEffect(() => {
  //   const getThisNews = () => {
  //     try {
  //       // fetch the news from the cms
  //       getSingleNews(slug).then((res) => {
  //         // only set news when there is a response, using if keeps infinite loader
  //         res && setNews(res[0])
  //       })
  //     } catch (error) {
  //       if (error) {
  //         setError(error.message)
  //       }
  //     }
  //   }
  //   getThisNews()
  // }, [slug])

  // useEffect(() => {
  //   // get the current news comments
  //   getNewsComments(slug).then((res) => {
  //     res && setComments(res.data)
  //   })
  // }, [])

  // let html
  // if (news) {
  //   // when the news is premium and the user has a subscription let them reall all, else let them read 2 paragraphs if the user user is logged in let them read the free news but if not logged in, let them read 2 paragraphs
  //   // html = `${news.post_type === 'premium' ? (hasSubscription ? news.post_description : news.post_description.slice(0, 2000)) : (user ? news.post_description : news.post_description.slice(0, 2000))}`;

  //   html = `${
  //     news.post_type === 'premium'
  //       ? hasSubscription
  //         ? news.post_description
  //         : news.post_description.slice(0, 1000)
  //       : news.post_description
  //   }`
  // }

  if (loading || singleNews === null || news === null) {
    return <Loader />
  }

  const currentCategoryNews = news.filter((news) => {
    if (singleNews.length === 0) return ''
    return news.category_id === singleNews[0].category_id
  })
  const currentCategoryNewsWithoutSingleNews = currentCategoryNews.filter(
    (news) => {
      if (singleNews.length === 0) return ''
      return news.id !== singleNews[0].id
    },
  )
  // const randomNews = Math.floor(
  //   Math.random() * currentCategoryNewsWithoutSingleNews.length,
  // )
  // const nextArticle = currentCategoryNewsWithoutSingleNews[randomNews]
  // const prevArticle = currentCategoryNewsWithoutSingleNews[0]

  const { previous, next } = getAdjacentPosts(slug)

  console.log(previous, next)

  console.log(currentCategoryNews)
  console.log(singleNews[0])

  return (
    <Fragment>
      <Nav />
      {/* {news && ( */}
      {/* <div className="container news pr-lg-5"> */}
      {/* <div className="col-s12 read-news-banner">
            <LargeSizeAds img={bannerAds} />
          </div> */}
      {/* <div className="row mt-5"> */}
      {/* <article className="news-body col-12 col-md-12 col-lg-9 bg-dager"> */}
      {/* <span className="news-posted-date small">
                {news.category_id} - {formatDate(news.created_at)} -{' '}
                {news.post_type?.toUpperCase()}
              </span> */}
      {/* <h2 className="post_title">{news.post_title}</h2> */}
      {/* <div className="img-news-con">
                <img
                  className="post_img"
                  src={`https://api.tv24africa.com/public/storage/post_image/${news.featured_image}`}
                  alt="news"
                />
              </div> */}
      {/* <div className="text-wrap">{ReactHtmlParser(html, options)}</div> */}
      {/* <div className="mt-5 news-paywall-area"> */}
      {/* if the user is not logged in, prompt them to login or signup */}
      {/* {!user && news.post_type === 'free' && <FreeReaderPersuader />} */}

      {/* prompt users without subscription to get 1 */}
      {/* {news.post_type === 'premium' && !user && (
                  <ContinueReadingWithAuth />
                )} */}

      {/* {news.post_type === 'premium' && user && !hasSubscription && (
                  <ContinueReadingWithSubscription />
                )} */}
      {/* <ShareNews
                  post_title={news.post_title}
                  post_description={news.post_description}
                  slug={slug}
                /> */}
      {/* <section className="up-next-container"> */}
      {/* <article className="previous-article">
                    <a href={`/post/${previousPost?.slug}`}>
                      <p className="previous-article-heading">
                        Previous Article
                      </p>
                      <span className="previous-article-content">
                        {previousPost?.post_title}
                      </span>
                    </a>
                  </article> */}
      {/* <article className="next-article">
                    <a href={`/post/${nextPost?.slug}`}>
                      <p className="next-article-heading">Next Article</p>
                      <span className="next-article-content">
                        {nextPost?.post_title}
                      </span>
                    </a>
                  </article> */}
      {/* </section> */}
      {/* <div className="free-users-persuader"> */}
      {/* <button className="news-teaser-article-heading">
                    Related Articles
                  </button> */}
      {/* <section className="news-teaser-article"> */}
      {/* {
                      // only show the news that are in the same category with the current news and remove the current news from the displayed ones
                      categoryNews
                        ?.filter((newsList) => newsList.id !== news.id)
                        .slice(0, 4)
                        .map(({ featured_image, post_title, slug }) => {
                          return (
                            <article key={post_title}>
                              <div className="news-teaser-img-wrap">
                                <img
                                  loading="lazy"
                                  src={`https://api.tv24africa.com/public/storage/post_image/${featured_image}`}
                                  alt="img"
                                />
                              </div>
                              <p>
                                <a
                                  href={`/post/${slug}`}
                                  className="news-teaser-heading"
                                >
                                  {post_title}
                                </a>
                              </p>
                            </article>
                          )
                        })
                    } */}
      {/* </section> */}

      {/* news comments */}
      {/* <NewsComments comments={comments} /> */}
      {/* comment form */}
      {/* <CommentForm post_title={news.post_title} post_id={news.id} /> */}
      {/* </div> */}
      {/* </div> */}
      {/* </article> */}
      {/* <section className="d-none d-md-block d-lg-block ml-3 ml-md-4 mx-auto ml-lg-0 col-10 col-md-7 col-lg-3 news-reader-list">
              <PopulateReadersList news={categoryNews} start={0} end={2} />
              <ul className="list-unstyled mb-5">
                <li>
                  <ContactsAds1 />
                </li>
              </ul>
              <PopulateReadersList news={categoryNews} start={4} end={6} />
              <ul className="list-unstyled mb-5">
                <li>
                  <ContactsAds1 />
                </li>
              </ul>
            </section> */}
      {/* </div> */}
      {/* </div> */}
      {/* // )} */}
      <div className="single-news-section">
        <div className="single-news-section-wrapper">
          <div className="s-n-ads-container">
            <LargeSizeAds img={bannerAds} />
          </div>
          <main className="single-news-main-section">
            <div className="s-n-content-grid">
              <div className="s-n-left-content">
                {!loading && singleNews.length === 0 ? (
                  <h5>Post Unavailable</h5>
                ) : (
                  <div className="available-content">
                    <h5 className="news-post-title">
                      {singleNews[0].post_title}
                    </h5>
                    <div className="news-img-container">
                      <img
                        src={`https://api.tv24africa.com/public/storage/post_image/${singleNews[0].featured_image}`}
                        alt="featuredImg"
                        className="news-img"
                      />
                    </div>

                    <div className="main-content">
                      {ReactHtmlParser(singleNews[0].post_description, options)}
                    </div>

                    <div className="check-mate">
                      {!loggedin ? (
                        <NotLoggedIn />
                      ) : loggedin && !subscription ? (
                        <LoggedInNotSubscribed />
                      ) : (
                        ''
                      )}
                    </div>

                    <div className="next-prev-section">
                      <div className="news-social-icons">
                        <p className="share">Share this story</p>
                        <span className="news-social-icons-items n-facebook">
                          <i className="fab fa-facebook"></i>
                        </span>
                        <span className="news-social-icons-items n-twitter">
                          <i className="fab fa-twitter"></i>
                        </span>
                        <span className="news-social-icons-items n-instagram">
                          <i className="fab fa-instagram"></i>
                        </span>
                        <span className="news-social-icons-items n-whatsapp">
                          <i className="fab fa-whatsapp"></i>
                        </span>
                        <span className="news-social-icons-items n-linkedin">
                          <i className="fab fa-linkedin"></i>
                        </span>
                      </div>
                      <div className="next-or-prev-section">
                        <div className="previous">
                          <p className="previous-article">Previous Article</p>
                          <Link
                            to={`/post/${previous.slug}`}
                            className="prev-link"
                          >
                            {previous.slug}
                          </Link>
                        </div>
                        <div className="next">
                          <p className="next-article">Next Article</p>
                          <Link to={`/post/${next.slug}`} className="next-link">
                            {next.slug}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="related-articles-section">
                      <button className="related-articles-btn">
                        related articles
                      </button>
                      <div className="related-content">
                        <Row xs={1} md={4} className="g-4">
                          {currentCategoryNewsWithoutSingleNews
                            .slice(0, 4)
                            .map((categ, idx) => (
                              <Col className="related-card" key={categ.id}>
                                <Link
                                  to={`/post/${categ.slug}`}
                                  className="related-link"
                                >
                                  <Card className="l-card">
                                    <Card.Img
                                      variant="top"
                                      src={`https://api.tv24africa.com/public/storage/post_image/${categ.featured_image}`}
                                      className="mb-3 card-img-related"
                                    />
                                    <Card.Body className="l-card-body">
                                      <Card.Text>{categ.slug}</Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Link>
                              </Col>
                            ))}
                        </Row>
                      </div>
                    </div>

                    {/* POST COMMENT && COMMENT SECTION */}
                  </div>
                )}
              </div>
              <div className="s-n-right-content">Right</div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default GetNews
