import css from './App.module.scss';
import background from './assets/img/background.png';
import ServerList from "./components/ServerList/ServerList";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className={css.background}>
        <img className={css.backgroundImage} src={background} alt=""/>
        <ServerList />
        <Main />
    </div>
  );
}

export default App;
