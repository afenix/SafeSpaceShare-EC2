import { useState, useEffect } from 'react';

const useIdentityCategories = () => {
  const [identityCategories, setIdentityCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdentityCategories = async () => {
      try {
        const response = await fetch('/api/identity-categories');
        const data = await response.json();
        setIdentityCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching identity categories:', error);
        setLoading(false);
      }
    };

    fetchIdentityCategories();
  }, []);

  return { identityCategories, loading };
};

export default useIdentityCategories;
