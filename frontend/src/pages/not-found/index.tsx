import { Link } from "react-router-dom";
import { AppRoute } from "../../common/enums/enums";
import styles from "./index.module.css";
import { Layout } from "../../components/layout";

const NotFound: React.FC = () => {
	return (
		<Layout>
			<h1 className={styles.title}>Not Found</h1>
			<Link to={AppRoute.ROOT}>Return Home</Link>
		</Layout>
	);
};

export { NotFound };
