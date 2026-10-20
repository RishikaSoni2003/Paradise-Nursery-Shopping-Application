import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to grow and propagate.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores from air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity indoors.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/17/ficus-elastica-4850616_1280.jpg", description: "Large shiny leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/18/09/aloe-vera-3284620_1280.jpg", description: "Medicinal soothing gel.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/28/09/01/lavender-1547303_1280.jpg", description: "Calming floral fragrance.", cost: "$16" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Great for cooking and aroma.", cost: "$11" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2017/07/07/12/26/mint-2481358_1280.jpg", description: "Refreshing herbal scent.", cost: "$8" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/06/20/14/31/jasmine-3486588_1280.jpg", description: "Sweet smelling flowers.", cost: "$22" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/02/10/12/12/eucalyptus-2055018_1280.jpg", description: "Fresh minty aroma.", cost: "$17" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/lemon-balm-2337722_1280.jpg", description: "Zesty citrus smell.", cost: "$9" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/14/14/01/zz-plant-5916805_1280.jpg", description: "Thrives in low light.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/12/04/11/58/pothos-3855388_1280.jpg", description: "Vining fast grower.", cost: "$13" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2017/02/23/19/22/jade-plant-2093033_1280.jpg", description: "Resilient succulent.", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/04/10/01/houseplant-5128522_1280.jpg", description: "Nearly indestructible.", cost: "$28" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/01/29/14/42/aglaonema-5961233_1280.jpg", description: "Tolerates dry air.", cost: "$19" },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/21/16/06/succulents-1846153_1280.jpg", description: "Requires minimal water.", cost: "$14" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={onHomeClick}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={() => setShowCart(false)}>Plants</a>
          <a href="#" onClick={() => setShowCart(true)}>
            Cart 🛒 <span className="cart-count">{totalCartCount}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-title">{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
