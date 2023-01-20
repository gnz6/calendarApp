import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./calendar/router/AppRouter"
import { store } from "./redux/store/store"
import { Provider } from "react-redux"

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
