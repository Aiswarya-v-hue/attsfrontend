
import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/formstyle.css'
import { useCallback } from 'react';
import backendUrl from '../config';
function Productform() {
    const [getproduct, setgetproduct] = useState([]);
    const [editProduct, setEditProduct] = useState(null); // For updating a product
    const Token = localStorage.getItem('token'); 

    const initialValues = {
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        manufacturingDate: "",
        image: null,
    };

    const validationSchema = yup.object({
        name: yup.string().matches(/^[a-zA-Z0-9\s]+$/, "Name must be alphanumeric").required("Name is required"),
        price: yup.number().positive("Price must be a positive number").required("Price is required"),
        stock: yup.number().positive("Stock must be a positive number").required("Stock is required"),
        description: yup.string().max(500, "Description cannot exceed 500 words").required(),
        category: yup.string().oneOf(['Gold', 'Silver', 'Diamond'], "Invalid category").required("Category is required"),
        manufacturingDate: yup.date().required("Manufacturing date is required"),
        image: yup.mixed().required("Image is required")
    });

    //  Fetch All Products
    const getallproducts = useCallback(async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/auth/myproducts`, {
                headers: { 'Authorization': `Bearer ${Token}` }
            });
            setgetproduct(response.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [Token]);
    
    useEffect(() => { 
        getallproducts(); 

    },[getallproducts]);

    //  Add Product
    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('description', values.description);
        formData.append('category', values.category);
        formData.append('manufacturingDate', values.manufacturingDate);
        formData.append('image', values.image);

        try {
            await axios.post(`${backendUrl}/api/auth/addproduct`, formData, {
                headers: { 'Authorization': `Bearer ${Token}`, 'Content-Type': 'multipart/form-data' }
            });
            alert("Product added successfully!");
            resetForm();
           getallproducts(); // Refresh the list
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    // Delete Product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/auth/delete/${id}`, {
                headers: { 'Authorization': `Bearer ${Token}` }
            });
            alert("Product deleted successfully!");
            getallproducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    //  Update Product
    //  Updated handleUpdate function
    const handleUpdate = async (values) => {
        try {
          const formattedDate = values.manufacturingDate
            ? new Date(values.manufacturingDate).toISOString().split("T")[0]
            : '';
      
          const updatedData = {
            ...values,
            manufacturingDate: formattedDate,
          };
      
          const res = await axios.post(
            `${backendUrl}/api/auth/productupdate/${values._id}`,
            updatedData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
      console.log(res.data);
      
          alert("Product updated successfully!");
          setEditProduct(null);
          getallproducts();
        } catch (error) {
          console.error(" Error updating product:", error);
        }
      };
      

      
    return (
        <div>
            {/*  Product Form */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                    <Form className='designerform'>
                        <div className='innerform'>
                            <div className='field_design'>
                                <label> Product Name :</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Price :</label>
                                <Field type="number" name="price" />
                                <ErrorMessage name="price" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Stock :</label>
                                <Field type="number" name="stock" />
                                <ErrorMessage name="stock" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Description :</label>
                                <Field as="textarea" name="description" />
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Category :</label>
                                <Field as="select" name="category">
                                    <option value="">Select a category</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Diamond">Diamond</option>
                                </Field>
                                <ErrorMessage name="category" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Manufacturing Date :</label>
                                <Field type="date" name="manufacturingDate" />
                                <ErrorMessage name="manufacturingDate" component="div" />
                            </div>
                            <div className='field_design'>
                                <label>Image :</label>
                                <input type="file" name="image" accept="image/*"
                                    onChange={(event) => {
                                        setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                />
                                <ErrorMessage name="image" component="div" />
                            </div>
                            <button type="submit" className="submit_btn">Submit</button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/*  Display Products */}
            <div className="product-list">
                {getproduct.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={`${backendUrl}/uploads/${product.image}`} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <p>{product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Date: {new Date(product.manufacturingDate).toDateString()}</p>
                        <button onClick={() => setEditProduct(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {editProduct && (
              <Formik
              initialValues={{
                ...editProduct,
                manufacturingDate: editProduct.manufacturingDate
                  ? new Date(editProduct.manufacturingDate).toISOString().split("T")[0]
                  : '',
              }}
              enableReinitialize
              onSubmit={handleUpdate}
            >
            
              {() => (
                  <Form className="update-modal">
                      <h2>Edit Product</h2>
                      <Field type="text" name="name" />
                      <Field type="number" name="price" />
                      <Field type="number" name="stock" />
                      <Field as="textarea" name="description" />
                      <Field as="select" name="category">
                          <option value="Gold">Gold</option>
                          <option value="Silver">Silver</option>
                          <option value="Diamond">Diamond</option>
                      </Field>
                      <Field type="date" name="manufacturingDate" />
          
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setEditProduct(null)}>Cancel</button>
                  </Form>
              )}
          </Formik>
          
            )}
        </div>
    );
}

export default Productform;
