import Example from './Example';
import './sandbox-styles.css';

export default function Layout() {
    return (
        <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
        document.getElementById('root'),
      );
}