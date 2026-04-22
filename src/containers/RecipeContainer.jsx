import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Recipe from '../pages/Recipe/Recipe';
import { searchRecipesByIngredient } from '../services/foodApi';

const PAGE_SIZE = 20;

const RecipeContainer = ({ username }) => {
  const { foodId } = useParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!foodId) return;
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      setRecipes([]);
      setPage(1);
      setHasMore(true);
      try {
        const result = await searchRecipesByIngredient(
          decodeURIComponent(foodId),
          1,
          PAGE_SIZE,
        );
        setRecipes(result);
        if (result.length < PAGE_SIZE) setHasMore(false);
      } catch (e) {
        setError('레시피를 불러오는 데 실패했어요. 잠시 후 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [foodId]);

  const fetchMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const start = (nextPage - 1) * PAGE_SIZE + 1;
      const end = nextPage * PAGE_SIZE;
      const result = await searchRecipesByIngredient(
        decodeURIComponent(foodId),
        start,
        end,
      );
      setRecipes((prev) => [...prev, ...result]);
      setPage(nextPage);
      if (result.length < PAGE_SIZE) setHasMore(false);
    } catch (e) {
      setError('추가 레시피를 불러오는 데 실패했어요.');
    } finally {
      setLoadingMore(false);
    }
  }, [foodId, page, loadingMore, hasMore]);

  const handleGoBack = () => navigate(-1);

  return (
    <Recipe
      foodId={decodeURIComponent(foodId || '')}
      recipes={recipes}
      loading={loading}
      loadingMore={loadingMore}
      hasMore={hasMore}
      error={error}
      onGoBack={handleGoBack}
      onLoadMore={fetchMore}
    />
  );
};

export default connect(({ auth }) => ({
  username: auth.username,
}))(RecipeContainer);
