
import './App.css';
import ProductPage from "./Page/ProductPage"
import {  ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
// import store from './redux/store'

function App() {
  


  return (
    
    <ThemeProvider >
     

      <ProductPage></ProductPage>
      
     
     
    </ThemeProvider>
  );
}

export default App;
