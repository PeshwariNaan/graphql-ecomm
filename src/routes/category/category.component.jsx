import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

//import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';

const GET_CATEGORY = gql`
  query ($title: String) {
    getCollectionsByTitle(title: $title) {
      title
      id
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();

  const { loading, errors, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category,
    },
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items },
      } = data;
      setProducts(items);
    }
  },[data, category]);

  //const { categoriesMap, loading } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Title>{category.toUpperCase()}</Title>
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
