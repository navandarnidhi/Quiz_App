import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, InputNumber, message, Space, Spin } from 'antd';
import QuizService from "../../service/quizService.js";

function QuizForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            QuizService.getQuizById(id)
                .then(response => {
                    const fetchedQuiz = response.data;
                    form.setFieldsValue({
                        title: fetchedQuiz.title,
                        description: fetchedQuiz.description,
                        duration: fetchedQuiz.duration / 60,
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch quiz for edit:", err);
                    message.error("Failed to load quiz information for editing.");
                    setLoading(false);
                });
        }
    }, [id, form]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const quizDataToSend = {
                title: values.title,
                description: values.description,
                duration: values.duration * 60,
            };
            if (id) {
                await QuizService.updateQuiz(id, quizDataToSend);
                message.success('Quiz updated successfully!');
            } else {
                await QuizService.createQuiz(quizDataToSend);
                message.success('Quiz created successfully!');
            }
            navigate('/quizzes');
        } catch (err) {
            console.error("Error saving quiz:", err.response ? err.response.data : err.message);
            message.error("An error occurred while saving the quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && id) {
        return <Spin tip="Loading quiz information..." size="large" className="flex justify-center items-center h-64" />;
    }

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>{id ? 'Edit Quiz' : 'Create New Quiz'}</h1>
            <Spin spinning={loading}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        title: '',
                        description: '',
                        duration: 60,
                    }}
                >
                    <Form.Item
                        label="Quiz Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the quiz title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Duration (minutes)"
                        name="duration"
                        rules={[
                            { required: true, message: 'Please enter the quiz duration!' },
                            {
                                type: 'number',
                                min: 1,
                                message: 'Duration must be at least 1 minute!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {id ? 'Update Quiz' : 'Create Quiz'}
                            </Button>
                            <Button onClick={() => navigate('/quizzes')}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default QuizForm;
