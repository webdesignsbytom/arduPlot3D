import { useNavigate } from 'react-router-dom';

const useNavigateToPage = () => {
  const navigate = useNavigate();

  const navigateToPage = (page) => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      navigate(page, { replace: false });
    }, 300);
  };

  // Specific article page navigation
  const navigateToArticlePage = (article) => {
    window.scrollTo(0, 0); // Add scroll to top if needed
    setTimeout(() => {
      navigate(`/article/${article.id}`, { state: { article } });
    }, 300);
  };

  const navigateToCategoryPage = (category) => {
    window.scrollTo(0, 0); // Add scroll to top if needed
    setTimeout(() => {
      navigate(`/${category.url.toLowerCase()}`, { replace: false, state: { category } });
    }, 300);
  };

  return { navigateToPage, navigateToCategoryPage, navigateToArticlePage };
};

export default useNavigateToPage;

// const navigateToPage = useNavigateToPage();
