  import React, { useState } from "react";
  import axios from "axios";
  const CreateBanner = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("active", active);

        const response = await axios.post(
          "http://localhost:5000/api/v1/Bannercreate",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMessage(response.data.msg);
      } catch (error) {
        console.error("Error creating banner:", error);
        setMessage("Error creating banner. Please try again.");
      }
    };
    return (
      <div className="container min-h-screen mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create Banner</h1>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-1">
              Image:
            </label>
            <input
  type="file"
  id="image"
  name="image" // Make sure the name attribute is set to "image"
  onChange={handleImageChange}
  className="w-full border rounded px-3 py-2"
  required
/>
          </div>
          <div className="mb-4">
            <label htmlFor="active" className="block font-medium mb-1">
              Active:
            </label>
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            <span>Active</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Banner
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    )
  }

  export default CreateBanner