import { useState, useEffect } from "react"
import axios from 'axios'
const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    images: [],
    property: '',
    sizes: [],
    originalPrice: 0,
    discoPrice: 0,
    vendor: '',
    sku: '',
    available: false,
    productType: '',
    Desc: '',
    Category: '',
    addInfo: {
      base: '',
      material: '',
      dishwasherSafe: '',
      packageContent: '',
      warranty: 0,
      certification: ''
    }
  });
  const [Categorys, setCategorys] = useState([])

  const fetchCategoreies = async () => {
    try {
      const res = await axios.get("https://cooker.onrender.com/api/v1/getAllCategorey")
      console.log(res.data)
      setCategorys(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCategoreies()
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // For nested fields like "addInfo.base", split the name and update nested state
    if (name.includes(".")) {
      const [fieldName, nestedFieldName] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else if (name === "size") {
      // For the size field in sizes array, we need to find the index in the sizes array
      // and update the size at that index
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      const updatedSizes = [...formData.sizes];
      updatedSizes[index].size = value;
      setFormData((prevData) => ({
        ...prevData,
        sizes: updatedSizes,
      }));
    } else {
      // For regular fields, update directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleAddSize = () => {
    setFormData(prevData => ({
      ...prevData,
      sizes: [...prevData.sizes, { size: '', originalPrice: 0, discoPrice: 0 }]
    }));
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes.splice(index, 1);
    setFormData(prevData => ({
      ...prevData,
      sizes: updatedSizes
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/create-product', formData);
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error
    }
  };

  return (
    <div className="w-[1200px] min-h-screen mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex gap-2 w-full">
          {/* Category */}
          <div className="mb-4 w-1/2">
            <label htmlFor="Category" className="block text-sm font-medium text-gray-900">Category</label>
            <select name="Category" id="Category" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.Category} onChange={handleChange}>
              <option value="">Select Category</option>
              {Categorys.map((category, index) => (
                <option key={index} value={category.category}>{category.category}</option>
              ))}
            </select>
          </div>
          {/* Product Name */}
          <div className="mb-4 w-1/2">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-900">Product Name</label>
            <input type="text" name="productName" id="productName" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.productName} onChange={handleChange} />
          </div>
        </div>
        {/* Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-900">Images</label>
          <input type="file" name="images" id="images" accept="image/*" multiple className="mt-1 py-4 text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" onChange={handleChange} />
        </div>
        {/* Property */}
        <div className="mb-4">
          <label htmlFor="property" className="block text-sm font-medium text-gray-900">Property</label>
          <select name="property" id="property" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.property} onChange={handleChange}>
            <option value="">Select Property</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Trending">Trending</option>
            <option value="Top Selling">Top Selling</option>
            <option value="Hot Product">Hot Product</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Sizes</label>
          {formData.sizes.map((size, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                data-index={index}
                className="mt-1 py-2 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-900 rounded-md mr-2"
                value={size.size}
                name="size"
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select Size</option>
                {Array.from({ length: 44 }, (_, i) => (
                  <option key={i} value={(i + 1) * 0.25}>
                    {(i + 1) * 0.25} litre
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="originalPrice"
                placeholder="Original Price"
                className="mt-1 py-2 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-900 rounded-md mr-2"
                value={size.originalPrice}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="text"
                name="discoPrice"
                placeholder="Discounted Price"
                className="mt-1 py-2 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm border-gray-900 rounded-md mr-2"
                value={size.discoPrice}
                onChange={(e) => handleChange(e, index)}
              />
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2"
                onClick={() => handleRemoveSize(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={handleAddSize}
          >
            Add Size
          </button>
        </div>


        {/* You can add dynamic fields for sizes if needed */}
        <div className="flex gap-2">

          {/* Original Price */}
          <div className="mb-4 w-1/2">
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-900">Original Price</label>
            <input type="text" name="originalPrice" id="originalPrice" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.originalPrice} onChange={handleChange} />
          </div>
          {/* Discounted Price */}
          <div className="mb-4 w-1/2">
            <label htmlFor="discoPrice" className="block text-sm font-medium text-gray-900">Discounted Price</label>
            <input type="text" name="discoPrice" id="discoPrice" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.discoPrice} onChange={handleChange} />
          </div>
        </div>
        <div className="flex gap-2">
          {/* Vendor */}
          <div className="mb-4 w-1/2">
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-900">Vendor</label>
            <input type="text" name="vendor" id="vendor" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.vendor} onChange={handleChange} />
          </div>
          {/* SKU */}
          <div className="mb-4 w-1/2">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-900">SKU</label>
            <input type="text" name="sku" id="sku" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.sku} onChange={handleChange} />
          </div>
        </div>

        {/* Product Type */}
        <div className="mb-4">
          <label htmlFor="productType" className="block text-sm font-medium text-gray-900">Product Type</label>
          <input type="text" name="productType" id="productType" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.productType} onChange={handleChange} />
        </div>
        <div className="w-full flex gap-2">

          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-900">Additional Info</label>
            {/* Base */}
            <input type="text" name="addInfo.base" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Base" value={formData.addInfo.base} onChange={handleChange} />
            {/* Material */}
            <input type="text" name="addInfo.material" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Material" value={formData.addInfo.material} onChange={handleChange} />
            {/* Dishwasher Safe */}
            <input type="text" name="addInfo.dishwasherSafe" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Dishwasher Safe" value={formData.addInfo.dishwasherSafe} onChange={handleChange} />

          </div>
          <div className="mt-5 w-1/2">
            {/* Package Content */}
            <input type="text" name="addInfo.packageContent" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Package Content" value={formData.addInfo.packageContent} onChange={handleChange} />
            {/* Warranty */}
            <input type="number" name="addInfo.warranty" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Warranty" value={formData.addInfo.warranty} onChange={handleChange} />
            {/* Certification */}
            <input type="text" name="addInfo.certification" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md mb-2" placeholder="Certification" value={formData.addInfo.certification} onChange={handleChange} />
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="Desc" className="block text-sm font-medium text-gray-900">Description</label>
          <textarea name="Desc" id="Desc" rows="3" className="mt-1 py-4 border-[1px] text-black bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-900 rounded-md" value={formData.Desc} onChange={handleChange}></textarea>
        </div>

        {/* Additional Info */}

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Create Product</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct