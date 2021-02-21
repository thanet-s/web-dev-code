import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Cart(props) {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);


    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
          </h3>
                    <div>
                        Price
          </div>
                </li>
                {
                    cartItems.length === 0 ?
                        <div>
                            Cart is empty
          </div>
                        :
                        cartItems.map(item =>
                            <li>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" style={{ maxWidth: "200px" }} />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/" + item.product}>
                                            {item.name}
                                        </Link>

                                    </div>
                                    <div>
                                        จำนวน: {item.qty}	&nbsp;
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                                            Delete
                    </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ราคา {item.price} * {item.qty} ชิ้น = {item.price * item.qty}
                                </div>
                            </li>
                        )
                }
            </ul>

        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>

        </div>

    </div>
}

export default Cart;