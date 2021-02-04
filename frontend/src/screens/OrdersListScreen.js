import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderList } from '../store/actions/orderActions'

const OrdersListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrderList())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, orders, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            // dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Table stripped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Is paid</th>
                            <th>Is delivered</th>
                            <th>Total price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    <LinkContainer to={`/users/${order.user._id}`}>
                                        {order.user.name}
                                    </LinkContainer>
                                </td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td align='center'>
                                    {order.isPaid ? <i className='fas fa-check' style={{color: 'green'}}></i>
                                : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                                <td align='center'>{order.isDelivered ? <i className='fas fa-check' style={{color: 'green'}}></i>
                                : <i className='fas fa-times' style={{color: 'red'}}></i>}
                                </td>
                                <td>${order.totalPrice}</td>
                                <td align='center'>
                                    <LinkContainer to={`/admin/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(order._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrdersListScreen
