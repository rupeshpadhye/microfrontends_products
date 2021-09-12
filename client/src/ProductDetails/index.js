import React, { useEffect, useState } from "react";
import { Button, Rate, Spin, Modal, Form, Input } from "antd";
import {
  useParams
} from "react-router-dom";
import Websocket from 'react-websocket';

import { Reviews, ReviewForm } from './components';
import styles from "./ProductDetails.module.css";
import { fetchProductDetails, saveReview } from "../api";

const ReviewModal = ({
    isModalVisible,
    handleCancel,
    onSubmit,
    isSaving,
}) => {
    return (
    <Modal
        title="What's your rating?"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
      <ReviewForm onSubmit={onSubmit} isSaving={isSaving}/>
    </Modal>
    )
}

const Header = ({ title, children }) => {
  return (
    <div className={styles.productHeader}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { identifier } = useParams();
  const getProductInfo = async () => {
    try {
      const product = await fetchProductDetails(identifier);
      setProduct(product);
    } catch(e) {
      console.log(e);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }
  const addReview = async (values) => {
    try {
      setIsSaving(true);
      setIsModalVisible(false);
     const product = await saveReview(identifier,values);
     setProduct(product);
    } catch(e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    getProductInfo();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = async (values) => {
    addReview(values);
  }

  const handleRealTimeUpdate = (data) => {
    try {
      const product = JSON.parse(data);
      console.log('realtime update',product);
      setProduct(product);
    } catch(e) {
      console.error(e);
    }
  }
  if(loading) {
    return (<div className={styles.loadingContainer}>
      <Spin />
    </div>)
  }
  return product ? (
    <section>
      <Header title={product.title}>
        <span className={styles.headerRating}>{product.avgRating}</span>
        <Rate allowHalf defaultValue={product.avgRating} disabled />
        <Button
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          Add Review
        </Button>
      </Header>
      <Reviews reviews={product.reviews} />
     <ReviewModal
        handleCancel ={handleCancel}
        onSubmit={onSubmit}
        isModalVisible={isModalVisible}
        isSaving={isSaving}
     />
     <Websocket url={`ws://${window.location.host}/api/products/${identifier}/live`}
     onMessage={handleRealTimeUpdate}/>
    </section>
  ) : (
    isError ? <div className={styles.errorContainer}>Product Not Found</div> : null
  );
};

export default ProductDetails;
