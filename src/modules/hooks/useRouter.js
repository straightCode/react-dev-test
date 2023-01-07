import { useMemo } from 'react';
import {
    useParams,
    useLocation,
    useHistory,
    useRouteMatch
} from 'react-router-dom';

export function useRouter() {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,

            params,
            match,
            location,
            history
        };
    }, [params, match, location, history]);
}