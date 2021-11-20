import React, {useEffect, useState} from "react";
import css from './ServerList.module.scss';
import logo from '../../assets/img/logo_min.png'
import loadingGif from '../../assets/gif/loading.gif';
import {useDispatch} from "react-redux";
import {mainContentName} from "../../redux/action/action";
import axios from "axios";

const ServerList = () => {

    const [active, setActive] = useState();
    const [connecting, setConnection] = useState(true);
    const [connected, setConnected] = useState(false);
    const [DB, setDB] = useState([]);
    const [fullOnline, setFullOnline] = useState(0);

    const dispatch = useDispatch();

    function resetServers () {
        axios.get(process.env.REACT_APP_HOST + '/serversList').then((response) => {
            if (response.status === 200) {
                setDB(response.data)
                setConnection(false);
            }
        })
            .catch((error) => {
                if (error) {
                    setConnected(false);
                    setConnection(false);
                }
            })
        axios.get(process.env.REACT_APP_HOST + '/fullOnline').then((response) => {
            if (response.status === 200) {
                setFullOnline(response.data);
                setConnected(true)
            }
        })
            .catch((error) => {
                if (error === 'Error: Network Error') {
                    setConnected(false);
                    setConnection(false);
                }
            })
    }

    useEffect(() => {
        resetServers()
        setInterval(resetServers, 30000)

    }, [dispatch])

    return (<div>
        {connecting ?
            <div className={css.serverListBackground}>
                <div className={css.projectInfo}>
                    <div className={css.iconWrapper}>
                        <img className={css.icon} src={logo} alt=""/>
                    </div>
                    <div className={css.projectName}>
                        {process.env.REACT_APP_PROJECT_NAME}
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img style={{marginTop: '150px'}} width={100} height={100} src={loadingGif} alt=""/>
                </div>
            </div>
                :
            <>
                {connected ?
                    <div className={css.serverListBackground}>
                        <div className={css.projectInfo}>
                            <div className={css.iconWrapper}>
                                <img className={css.icon} src={logo} alt=""/>
                            </div>
                            <div className={css.projectName}>
                                {process.env.REACT_APP_PROJECT_NAME}
                            </div>
                        </div>
                        <div className={css.playersOnline}>
                            <div>
                                {fullOnline} игрока онлайн!
                            </div>
                        </div>
                        {
                            DB.map((item, key) => {
                                return(
                                    <div className={css.serverBtnWrapper} key={key} id={'btn-' + key} onClick={() => {
                                        setActive(item.id);
                                        dispatch(mainContentName(item.name, item.ip, item.port))
                                    }}
                                         style={active === item.id ? {color:'rgba(255, 255, 255, 1)'}: null}>

                                        <div className={css.serverName}>
                                            {item.name}
                                        </div>
                                        {item.online.length !== 0 ? <div className={css.serverOnline}>
                                            {item.online}<br/>
                                            <div style={{fontSize: '12px', lineHeight: '5px'}}>
                                                онлайн!
                                            </div>
                                        </div>
                                            :
                                            <div className={css.serverOnline}>
                                                Выключен
                                            </div>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                        :
                    <div className={css.serverListBackground}>
                        <div className={css.projectInfo}>
                            <div className={css.iconWrapper}>
                                <img className={css.icon} src={logo} alt=""/>
                            </div>
                            <div className={css.projectName}>
                                {process.env.REACT_APP_PROJECT_NAME}
                            </div>
                        </div>
                        <div className={css.playersOnline}>
                            <div>
                                Сервера недоступны.
                            </div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <div className={css.msgError}>
                                Произошла ошибка. Нам не удалось получить список серверов.
                            </div>
                            <div style={{textAlign: 'center', marginTop: '20px', color: 'white', webkitAppRegion: 'none', cursor: 'pointer'}} onClick={() => {
                                window.windowControl.retry();
                            }}>
                                Обновить
                            </div>
                        </div>
                    </div>
                }
            </>
        }
    </div>);
}

export default ServerList;