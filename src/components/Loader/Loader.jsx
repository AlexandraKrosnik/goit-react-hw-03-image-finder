import { TailSpin } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <Spinner>
      <TailSpin color="grey" height={80} width={80} />
    </Spinner>
  );
};
