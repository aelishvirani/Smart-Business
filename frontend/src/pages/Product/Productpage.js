import React, { useEffect, useState, useRef } from 'react'
import Rating from '../../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet';
import CardProduct from '../../components/CardProduct'
import { listProductDetails, createproductReview, listProducts } from '../../actions/productActions'
import { AiFillTwitterCircle, AiFillInstagram, AiFillShop } from "react-icons/ai"
import { IoLogoFacebook } from "react-icons/io"
import { MdDoNotDisturb } from "react-icons/md"
import { Image, Select, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import HashLoader from "react-spinners/HashLoader";
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import './product.css'
import { Link } from 'react-router-dom'
const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setrating] = useState(0)
  const [comment, setcomment] = useState('')
  const [recommendations, setRecommendations] = useState([]);

  const imgs = document.querySelectorAll('.img-select a');
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview, } = productReviewCreate
  const [userId, setUserId] = useState(null);

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });



  function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    imgShowcase.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }


  // useEffect(() => {
  //   if (successProductReview) {
  //     alert('Review Submitted!')
  //     setrating(0)
  //     setcomment('')
  //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

  //   }
  //   dispatch(listProductDetails(match.params.id))

  // }
  //   , [dispatch, match, successProductReview])

  // const submithanlder = () => {
  //   // dispatch(createproductReview(match.params.id, { rating, comment }))
  //   if (userInfo) {
  //     dispatch(createproductReview(match.params.id, {
  //       rating,
  //       comment,
  //       user: userInfo._id // Assuming userInfo contains the user ID
  //     }));
  //   }
  // }

  useEffect(() => {
    if (userInfo) {
      dispatch(listProducts({ category: product.category[0], limit: 5 }))
        .then((data) => {
          setRecommendations(data);
        });
    }
  }, [dispatch, product.category, userInfo]);


  useEffect(() => {
    // Update user ID state if userInfo is available
    if (userInfo) {
      setUserId(userInfo._id);
    }
    console.log(userInfo)
    console.log(match.params.id)
    // Dispatch action to fetch product details
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, userInfo]);


  // const visibleProducts = productDetails.filter(product => product.visibility);

  // Submit review handler
  const submithanlder = () => {
    if (userId) {
      // Dispatch action to create product review
      dispatch(createproductReview(match.params.id, {
        rating,
        comment,
        user: userId // Pass user ID
      }));
    }
  };
  //Handler of button add to cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className='productpage'>
        {loading ? <div className='loading-product'>
          <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
        </div> : error ? <h2>{error} </h2> :

          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.images.map(i => (
                      <Image src={i} />
                    ))}





                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <a href="#" data-id="1">
                      <Image objectFit="cover" boxSize='200px' src={product.images[0]} alt="shoe image" />


                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="2">
                      <Image objectFit="cover" boxSize='200px' src={product.images[1]} alt="shoe image" />

                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="3">
                      <Image objectFit="cover" boxSize='200px' src={product.images[2]} alt="shoe image" />


                    </a>
                  </div>

                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.name} </h2>
                <Link to='/shop' className="product-link">visit our store</Link>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <div className="product-price">
                  <p className="last-price">Old Price: <span>&#8377;{product.price + product.price * 0.5}</span></p>
                  <p className="new-price">New Price: <span>&#8377;{product.price} (5%)</span></p>
                </div>

                <div className="product-detail">
                  <h2>about this item: </h2>
                  <p>{product.description}</p>
                  <div>
                    <ul>
                      <li>Size</li> <Select className='select-product' placeholder="Choose an option">
                        {product.sizes.map(size => (
                          <option value={size}>{size}</option>

                        ))}
                      </Select>
                    </ul>
                  </div>
                  <ul>
                    <li>Status: <span>{product.countInStock > 0 ? 'ìn stock' : 'Out Of Stock'}</span></li>
                    <li>Category: <span>{product.category.map(cg => ' | ' + cg + ' | ')}</span></li>
                    <li>Shipping Area: <span>All over the world</span></li>
                    <div>
                      <ul> <li>Qty :</li>
                        {product.countInStock > 0 ?
                          <Select as='select' size="md" maxW={20} value={qty} className='select-product' onChange={(e) => setQty(e.target.value)} >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>))}

                          </Select>
                          : <span style={{ display: 'flex' }}><MdDoNotDisturb size='26' />   OUT OF STOCK  </span>
                        }
                      </ul>
                    </div>



                  </ul>
                </div>

                <div className="purchase-info">
                  <Button onClick={addToCartHandler} type="button" className="btn-shop" disabled={product.countInStock === 0}> <AiFillShop size='24' />Add to Cart </Button>
                </div>

                <div className="social-links">
                  <p>Share On: </p>
                  <Link className='social' to="#">
                    <i> <IoLogoFacebook size='20' /></i>
                  </Link>
                  <Link className='social' href="#">
                    <i><AiFillTwitterCircle size='20' /></i>
                  </Link>
                  <Link className='social' href="#">
                    <i><AiFillInstagram size='20' /> </i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        }

        {/* {visibleProducts.length === 0 ?
          <h1 className='nothingfound'>Nothing Found !!!</h1> : <div className='cardsProduct'>
            {visibleProducts.map((product) => (
              <CardProduct key={product._id} product={product} />

            ))} */}

        {recommendations && recommendations.length > 0 && (
          <div className="recommendations">
            <h2>Recommendations</h2>
            <div className="recommendation-list">
              {recommendations.map((product) => (
                <div className="recommendation-item" key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    <p>Price: &#8377;{product.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}


        <div className='REVIEWS'>
          <h1>Reviews :</h1>
          {console.log(product)}
          {product && product.reviews && product.reviews.length === 0 && <h2>NO REVIEWS</h2>}
          <div>
            {product && product.reviews && product.reviews.map(review => (
              <div className='review' key={review._id}>
                <h4>{review.name}</h4>
                <div className='Ratingreview'>
                  <Rating value={review.rating} />
                </div>
                <p className='commentreview'>{review.comment}</p>
                <p className='datereview'>{review.createdAt.substring(0, 10)}</p>
              </div>
            ))}
            <div className='createreview'>
              <h1>Create New Review :</h1>
              {errorProductReview && <h2>{errorProductReview}</h2>}
              {userInfo ? (
                <FormControl>
                  <FormLabel>Rating :</FormLabel>
                  <Select onChange={(e) => setrating(e.target.value)} >
                    <option value='1'>1 POOR</option>
                    <option value='2'>2 FAIR</option>
                    <option value='3'>3 GOOD</option>
                    <option value='4'>4 VERY GOOD</option>
                    <option value='5'>5 EXCELLENT</option>
                  </Select>
                  <FormLabel>Comment :</FormLabel>
                  <Textarea onChange={(e) => setcomment(e.target.value)} placeholder='Leave Comment here :' />
                  <Button colorScheme='blue' onClick={submithanlder}>Submit</Button>
                </FormControl>
              ) : (
                <>
                  Please <Link to='/login'>Sign In</Link> To write a review.
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </>

  )

}

export default Productpage
