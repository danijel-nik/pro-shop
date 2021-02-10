import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../store/actions/productActions'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/constants/productConstants'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitReview = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Row className='my-3'>
                <Col>
                    <Link to='/'>Go Back</Link>
                </Col>
            </Row>

            {loading ? <Loader /> 
                : error ? <Message variant="danger">{error}</Message>
                : (
                    <>
                        <Meta title={`${product.name} | Proshop`} />
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <i>Price:</i> ${product.price}
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <i>Description:</i> {product.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price: 
                                                </Col>
                                                <Col>
                                                    ${product.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status: 
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}

                                        <ListGroupItem>
                                            <Button 
                                                onClick={addToCartHandler} 
                                                className='btn-block' 
                                                type='button' 
                                                disabled={product.countInStock === 0}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {product.reviews.length === 0 ? <Message>No Reviews</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {
                                            product.reviews.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ListGroup variant='flush'>
                                    <h2>Write a Customer Review</h2>
                                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                    {userInfo
                                       ? (
                                       <Form onSubmit={submitReview}>
                                           <Form.Group controlId='rating'>
                                               <Form.Label>Rating</Form.Label>
                                               <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                   <option value=''>Select...</option>
                                                   <option value='1'>1 - Poor</option>
                                                   <option value='2'>2 - Fair</option>
                                                   <option value='3'>3 - Good</option>
                                                   <option value='4'>4 - Very good</option>
                                                   <option value='5'>5 - Excellent</option>
                                               </Form.Control>
                                               <Form.Label>Comment</Form.Label>
                                               <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                               <Button type='submit' variant='primary'>
                                                   Submit
                                               </Button>
                                           </Form.Group>
                                       </Form>
                                       )
                                       : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                                </ListGroup>
                            </Col>
                        </Row>
                    </>
                )
            }
            
        </>
    )
}

export default ProductScreen
