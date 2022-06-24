import PropTypes from 'prop-types';
import { LoadMore, Container } from './Button.styled';
export const Button = ({ onLoadMore }) => {
  return (
    <Container>
      <LoadMore type="button" onClick={onLoadMore}>
        Load more
      </LoadMore>
    </Container>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
