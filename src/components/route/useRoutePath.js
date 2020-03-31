import { useLocation, matchPath } from 'react-router-dom';

export default function useRoutePath() {
  const location = useLocation();

  return {...location};
}
