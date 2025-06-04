import api from "../../utils/api.js"; // Update path if needed

// ✅ Create a new quiz
export const createQuiz = async (quizData) => {
	try {
		const response = await api.post("/quizzes", quizData);
		return response.data;
	} catch (error) {
		console.error("Error creating quiz:", error);
		throw error;
	}
};

// ✅ Get all quizzes
export const getAllQuizzes = async () => {
	try {
		const response = await api.get("/quizzes");
		return response.data;
	} catch (error) {
		console.error("Error fetching all quizzes:", error);
		throw error;
	}
};

// ✅ Get a quiz by ID
export const getQuizById = async (id) => {
	try {
		const response = await api.get(`/quizzes/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching quiz with ID ${id}:`, error);
		throw error;
	}
};

// ✅ Update a quiz
export const updateQuiz = async (id, updatedQuiz) => {
	try {
		const response = await api.put(`/quizzes/${id}`, updatedQuiz);
		return response.data;
	} catch (error) {
		console.error(`Error updating quiz with ID ${id}:`, error);
		throw error;
	}
};

// ✅ Delete a quiz
export const deleteQuiz = async (id) => {
	try {
		const response = await api.delete(`/quizzes/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting quiz with ID ${id}:`, error);
		throw error;
	}
};

// ✅ Fetch quizzes by subject (if needed)
export const getQuizzesBySubject = async (subject) => {
	try {
		const response = await api.get(`/quizzes?subject=${subject}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching quizzes for subject ${subject}:`, error);
		throw error;
	}
};

// ✅ Default export for importing as a single object
export default {
	createQuiz,
	getAllQuizzes,
	getQuizById,
	updateQuiz,
	deleteQuiz,
	getQuizzesBySubject
};
