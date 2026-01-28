import { MapProvider } from '@/shared/context/MapProvider';
import Layout from '@/layouts/Layout.tsx';
import MapPage from '@/pages/MapPage';

function App() {
  return (
    <MapProvider>
      <Layout>
        <MapPage/>
      </Layout>
    </MapProvider>
  );
}

export default App;
