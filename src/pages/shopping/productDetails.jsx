import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = { id, name: `Product ${id}`, price: id * 100, description: "This is a great product." };

    return (
        <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">${product.price}</p>
            <p className="mt-2">{product.description}</p>
            <button 
                onClick={() => dispatch(addToCart(product))} 
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;
