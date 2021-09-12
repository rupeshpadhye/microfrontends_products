import React from 'react';
import { Button, Rate, Form, Input } from "antd";

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
      >
        <Form.Item label='Rate'>
          {getFieldDecorator('rating', {
            initialValue: 4
          })(<Rate allowHalf />)}
        </Form.Item>
        <Form.Item label='Review'>
        {getFieldDecorator("note", { initialValue: '' })(
          <Input bordered='false' placeholder='Start typing...' />
        )}
      </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isSaving}>
            Submit
          </Button>
        </Form.Item>
       </Form>
    )

};

const ReviewForm = Form.create({ name: "review_form" })(FormComp);

export default ReviewForm;