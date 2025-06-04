import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, message, Spin, Tag, Typography } from 'antd';
import ResultService from "../../service/resultService.js";

const { Title, Text } = Typography;

function ResultDetail() {
    const { attemptId } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        ResultService.getResultByAttemptId(attemptId)
            .then(response => {
                setResult(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load result details:", err.response?.data?.detailMessage || err.message);
                message.error("Failed to load result details.");
                setError("An error occurred while loading data.");
                setLoading(false);
            });
    }, [attemptId]);

    if (loading) {
        return <Spin tip="Loading result..." size="large" className="flex justify-center items-center h-64" />;
    }
    if (error) {
        return <div className="text-center text-red-500 text-lg mt-8">{error}</div>;
    }
    if (!result) {
        return <div className="text-center text-red-500 text-lg mt-8">Result not found.</div>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '20px' }}>Quiz Result: {result.quizTitle}</Title>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
                <Descriptions bordered column={1} style={{ marginBottom: '30px' }}>
                    <Descriptions.Item label="User">{result.userName}</Descriptions.Item>
                    <Descriptions.Item label="Submitted At">
                        {new Date(result.timestamp).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Score">
                        <Text strong style={{
                            fontSize: '1.5em',
                            color: result.score >= result.totalQuestions / 2 ? 'green' : 'red'
                        }}>
                            {result.score}
                        </Text> / {result.totalQuestions}
                    </Descriptions.Item>
                </Descriptions>

                <Title level={3} style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    Answer Details
                </Title>

                {Object.keys(result.questionTexts).map(questionId => {
                    const qText = result.questionTexts[questionId];
                    const userAnswer = result.userAnswers ? result.userAnswers[questionId] : null;
                    const correctAnswer = result.correctAnswers ? result.correctAnswers[questionId] : null;
                    const isCorrect = userAnswer && correctAnswer && userAnswer.toLowerCase() === correctAnswer.toLowerCase();

                    return (
                        <Card
                            key={questionId}
                            style={{ marginBottom: '16px', borderColor: isCorrect ? '#d9f7be' : '#ffe7ba' }}
                            bodyStyle={{ backgroundColor: isCorrect ? '#f6ffed' : '#fff1e5' }}
                        >
                            <Title level={4} style={{ margin: 0 }}>
                                {qText}
                                <Tag color={isCorrect ? 'green' : 'red'} style={{ marginLeft: '10px' }}>
                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                </Tag>
                            </Title>
                            <p style={{ marginTop: '10px' }}>
                                <Text strong>Your answer:</Text> {userAnswer || "(No answer)"}
                            </p>
                            {!isCorrect && (
                                <p>
                                    <Text strong>Correct answer:</Text> <Text type="success">{correctAnswer}</Text>
                                </p>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default ResultDetail;
