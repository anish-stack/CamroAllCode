import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageModal from './ImageModal';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
const EditPoject = () => {
    const {id} = useParams()
  const [formData, setFormData] = useState({
    productName: "",
    property: "",
    originalPrice: "",
    discoPrice: "",
    vendor: "",
    sizes: [],
    sku: "",
    available: true,
    productType: "",
    Desc: "",
    Category: "",
    addInfo: {
      base: "",
      material: "",
      dishwasherSafe: "",
      packageContent: "",
      warranty: 0,
      certification: "",
    },

    images: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://cooker.onrender.com/api/v1/All-images');
      setFetchedImages(response.data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name.includes('.')) {
  //     const [parent, child] = name.split('.');
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [parent]: {
  //         ...prevData[parent],
  //         [child]: value
  //       }
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value
  //     }));
  //   }
  //   console.log("i am call");
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("addInfo.")) {
      const fieldName = name.split(".")[1]; // Extract the field name
      setFormData((prevData) => ({
        ...prevData,
        addInfo: {
          ...prevData.addInfo,
          [fieldName]: value // Update the specific nested property
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
    console.log("I am called");
  };
  
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index][field] = value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        {
          id: formData.sizes.length,
          size: "",
          originalPrice: 0,
          discoPrice: 0,
        },
      ],
    });
  };

  const removeSize = (index) => {
    const updatedSizes = formData.sizes.filter((_, idx) => idx !== index);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleImageClick = (imageUrl) => {
    console.log(imageUrl); // Just for debugging, you can remove this line if not needed
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, { img: imageUrl }]
    }));
  };


  const handleEdit = async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.patch(`https://cooker.onrender.com/api/v1/update-product/${id}`,formData)
        console.log(res.data)
        toast.success("Product Updated Successfull")
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
  }

  const singleProducts = async()=>{
    try {
        const response = await axios.post(`https://cooker.onrender.com/api/v1/single-product/${id}`)
        console.log(response.data.data)
        setFormData(response.data.data);
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    singleProducts()
  },[id])
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <p>**For Edit Products if image is Update  First upload Images in Upload-Images Tab</p>
      <Link to="/upload" className="text-blue-400 underline">Upload-images</Link>
      <form onSubmit={handleEdit} className="space-y-4">
  {/* Product Information */}
  <div className='flex gap-2'>
    <div className='w-1/2'>
      <label htmlFor="productName">Product Name:</label>
      <input type="text" id="productName" value={formData.productName} onChange={handleChange} name="productName" placeholder="Product Name" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor="property">Property:</label>
      <input type="text" id="property" value={formData.property} onChange={handleChange} name="property" placeholder="Property" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
  </div>
  <div className='flex gap-2'>
    <div className='w-1/2'>
      <label htmlFor="originalPrice">Original Price:</label>
      <input type="text" id="originalPrice" value={formData.originalPrice} onChange={handleChange} name="originalPrice" placeholder="Original Price" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor="discoPrice">Discount Price:</label>
      <input type="text" id="discoPrice" value={formData.discoPrice} onChange={handleChange} name="discoPrice" placeholder="Discount Price" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
  </div>
  <div className='flex gap-2'>
    <div className='w-1/2'>
      <label htmlFor="vendor">Vendor:</label>
      <input type="text" id="vendor" value={formData.vendor} onChange={handleChange} name="vendor" placeholder="Vendor" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor="sku">SKU:</label>
      <input type="text" id="sku" value={formData.sku} onChange={handleChange} name="sku" placeholder="SKU" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
  </div>


  {/* Image Upload */}
  <div className='flex  gap-2'>
  <div className='w-1/2'>
    <label htmlFor="productType">Product Type:</label>
    <input type="text" id="productType" value={formData.productType} onChange={handleChange} name="productType" placeholder="Product Type" className="block w-full border-[1px] p-2 mt-1 rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
  </div>
    <div className='w-1/2'>
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" value={formData.Category} onChange={handleChange} name="category" placeholder="Category" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
   
  </div>
  <div className=''>
      <button type="button" value={formData.images} onClick={() => setShowModal(true)} name='images' className="block w-full border-[1px] p-2 mt-1 rounded-md  bg-indigo-500 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
        Select Images
      </button>
    </div>
  {/* Additional Information */}
  <div className='flex gap-2'>
    <div className='w-1/2'>
      <label htmlFor="base">Base:</label>
      <input type="text" id="base" value={formData.addInfo.base} onChange={handleChange} name="addInfo.base" placeholder="Base" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor="material">Material:</label>
      <input type="text" id="material" value={formData.addInfo.material} onChange={handleChange} name="addInfo.material" placeholder="Material" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor="dishwasherSafe">Dishwasher Safe:</label>
      <input type="text" id="dishwasherSafe" value={formData.addInfo.dishwasherSafe} onChange={handleChange} name="addInfo.dishwasherSafe" placeholder="Dishwasher Safe" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
  </div>
  <div className='flex gap-2'>
  <div className='w-1/2'>
    <label htmlFor="packageContent">Package Content:</label>
    <input type="text" id="packageContent" value={formData.addInfo.packageContent} onChange={handleChange} name="addInfo.packageContent" placeholder="Package Content" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
  </div>
  <div className='w-1/2'>
    <label htmlFor="warranty">Warranty:</label>
    <input type="number" id="warranty" value={formData.addInfo.warranty} onChange={handleChange} name="addInfo.warranty" placeholder="Warranty" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
  </div>
  <div className='w-1/2'>
    <label htmlFor="certification">Certification:</label>
    <input type="text" id="certification" value={formData.addInfo.certification} onChange={handleChange} name="addInfo.certification" placeholder="Certification" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
  </div>
</div>


{formData.sizes.map((size, index) => (
  <div key={index} className="flex space-x-4 items-center">
    <div className='w-1/2'>
      <label htmlFor={`size_${index}`}>Size:</label>
      <input type="text" id={`size_${index}`} value={size.size} onChange={(e) => handleSizeChange(index, 'size', e.target.value)} name="size" placeholder="Size" className="flex-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor={`originalPrice_${index}`}>Original Price:</label>
      <input type="text" id={`originalPrice_${index}`} value={size.originalPrice} onChange={(e) => handleSizeChange(index, 'originalPrice', e.target.value)} name="originalPrice" placeholder="Original Price" className="w-32 block rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <div className='w-1/2'>
      <label htmlFor={`discoPrice_${index}`}>Discount Price:</label>
      <input type="text" id={`discoPrice_${index}`} value={size.discoPrice} onChange={(e) => handleSizeChange(index, 'discoPrice', e.target.value)} name="discoPrice" placeholder="Discount Price" className="w-32 block rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
    </div>
    <button type="button" onClick={() => removeSize(index)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50">Remove</button>
  </div>
))}
<button type="button" onClick={addSize} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Add Size</button>

<div>
  <label htmlFor="desc">Description:</label>
  <textarea value={formData.Desc} onChange={handleChange} name="desc" id="desc" placeholder="Description" className="block w-full mt-1 rounded-md border-gray-900 border-[1px] p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" />
</div>


        <button type="submit"  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50">Submit</button>
      </form>
      <ImageModal isOpen={showModal} onClose={() => setShowModal(false)} images={fetchedImages} handleImageClick={handleImageClick} />    </div>
  );
};

export default EditPoject;
