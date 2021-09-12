import React from 'react';
import { Button, Rate, Form, Input } from "antd";
import styles from './css/ReviewForm.module.css';

const FormComp = ({
    onSubmit,
    form,
    isSaving,
}) => {

    const onFinish = e => {
        e.preventDefault();
       form.validateFields((err, values) => {
          if (!err) {
            onSubmit(values);
            return;
          }
        });
      };
    const { getFieldDecorator } = form;
    return (
        <Form
        onSubmit={onFinish}
        name= 'review_form'
        colon="false" 
        layout={'vertical'}
        className={styles.reviewForm}
      >
        <Form.Item label={
          <div className={styles.reviewFormLabel}>
            Rating
          </div>
        } >
          {getFieldDecorator('rating', {
            initialValue: 4
          })(<Rate allowHalf />)}
        </Form.Item>
        <Form.Item label={
          <div className={styles.reviewFormLabel}>
            Review
          </div>
        } >
        {getFieldDecorator("note", { initialValue: '' })(
          <Input bordered='false' placeholder='Start typing...' />
        )}
      </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" disabled={isSaving} className={styles.button}>
            Submit Review
          </Button>
        </Form.Item>
       </Form>
    )

};

const ReviewForm = Form.create({ name: "review_form" })(FormComp);

export default ReviewForm;