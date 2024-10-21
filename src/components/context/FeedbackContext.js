import { createContext, useState, useEffect } from "react";
import FeedbackData from "../../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false)
  }

  // Update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem) 
    })

    const data = await response.json();
    //replace item where item.id === id with updatedItem
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json();
    //adds new feeback to current feedback items
    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
