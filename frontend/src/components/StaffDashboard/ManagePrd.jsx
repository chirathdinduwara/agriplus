import "../../css/AdminDashboard/admin-dashboard.css";
import "../../css/AdminDashboard/manage-content.css";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function ManagePrd() {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setproducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }

    fetchProducts();
  }, []);

const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  try {
    const response = await axios.delete(`http://localhost:5000/api/product/${id}`);
    if (response.data.success) {
      setproducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully!");
    } else {
      toast.error("Failed to delete the product.");
    }
  } catch (err) {
    console.error("Error deleting product:", err);
    toast.error("An error occurred while deleting the product.");
  }
};
  const handleAddProduct = () => {
    navigate("/s-dash/addPrd");
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/s-dash/updateProduct/${productId}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Product Report", 20, 20);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

    let yPos = 40;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product Name", 20, yPos);
    doc.text("Brand", 70, yPos);
    doc.text("Stock", 120, yPos);
    doc.text("Category", 170, yPos);
    yPos += 10;

    products.forEach((product) => {
      doc.setFont("helvetica", "normal");
      doc.text(String(product.prd_name), 20, yPos);
      doc.text(String(product.prd_brand), 70, yPos);
      doc.text(String(product.stock), 120, yPos);
      doc.text(String(product.cetegory), 170, yPos);
      yPos += 10;
    });

    doc.save("admin_product_report.pdf");
  };

  return (
    <div className="admin-dash">
      <h1 className="admin-dash-heading">Manage Products</h1>
      <div className="manage glassy-box">
        <button className="add" onClick={handleAddProduct}>Add Product</button>

        <div className="table-container">
          <table className="manage-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.prd_name}</td>
                  <td>{product.prd_brand}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.cetegory}</td>
                  <td><img src={product.img_url} alt="Product" width={50} /></td>
                  <td>
                    <button className="update-btn" onClick={() => handleUpdateProduct(product._id)}>Update</button>
                    <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="add" onClick={generatePDF}>Generate Report</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManagePrd;
