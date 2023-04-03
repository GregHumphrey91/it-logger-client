import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss';
import Navbar from './components/layout/NavigationMenu';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddTech from './components/techs/AddTech';
import TechListModal from './components/techs/TechListModal';
import store from './store';
import ToastMessage from './components/layout/ToastMessage';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <ToastMessage />
        <Container className="body-container">
          <Logs />
        </Container>
        <Container className="footer-container">
          <TechListModal />
          <AddBtn />
          <AddTech />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
