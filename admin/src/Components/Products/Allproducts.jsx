import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cooker.onrender.com/api/v1/All-product"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Logic to paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full overflow-scroll p-2">
      <h1 className="text-2xl text-black font-bold mb-4">Product List</h1>
      <table className="w-[1400px] border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border text-black border-gray-300 px-4 py-2">Image</th>
            <th className="border text-black border-gray-300 px-4 py-2">Product Name</th>
            <th className="border text-black border-gray-300 px-4 py-2">Original Price</th>
            <th className="border text-black border-gray-300 px-4 py-2">Discount Price</th>
            <th className="border text-black border-gray-300 px-4 py-2">Vendor</th>
            <th className="border text-black border-gray-300 px-4 py-2">Availability</th>
            <th className="border text-black border-gray-300 px-4 py-2">Description</th>
            <th className="border text-black border-gray-300 px-4 py-2">Category</th>
           

          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td className="border text-black border-gray-300 px-4 py-2">
                {product.images.length > 0 && (
                  <img src={product.images[0].img} alt={product.productName} className="w-24 h-24 object-cover" />
                )}
              </td>
              <td className="border text-blue-400 underline  border-gray-300 px-4 py-2"><Link to={`/EditProducts/${product._id}`}>{product.productName}</Link></td>
              <td className="border text-black  border-gray-300 px-4 py-2">{product.originalPrice}</td>
              <td className="border text-black  border-gray-300 px-4 py-2">{product.discoPrice}</td>
              <td className="border text-black  border-gray-300 px-4 py-2">{product.vendor}</td>
              <td className="border text-black  border-gray-300 px-4 py-2">{product.avilable ? 'Available' : 'Not Available'}</td>
              <td className="border text-black w-64 h-16 overflow-hidden border-gray-300 px-4 py-2">{product.Desc}</td>
              <td className="border text-black border-gray-300 px-4 py-2">{product.Category}</td>
              {/* Render only the first image */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 bg-red-400 hover:bg-red-300 rounded-full ${currentPage === i + 1 && 'bg-gray-400'}`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allproducts;
