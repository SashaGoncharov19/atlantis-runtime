import React, {useEffect, useState} from "react";
import css from './Main.module.scss';
import {useSelector} from "react-redux";
import logo from '../../assets/img/logo_min.png';
import settings from '../../assets/svg/settings.svg';
import minimize from '../../assets/svg/minimize.svg';
import close from '../../assets/svg/close.svg';
import loadingGif from '../../assets/gif/loading.gif';
import axios from "axios";

const Main = () => {
    const serverName = useSelector((state) => state.main.contentName)
    const serverIP = useSelector((state) => state.main.connectionIP);
    const serverPORT = useSelector((state) => state.main.connectionPORT);

    const [connection, setConnection] = useState(true);
    const [connected, setConnected] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setConnection(true);
        axios.get(`${process.env.REACT_APP_HOST}/newsList`).then((response) => {
           if (response.status === 200) {
               setPosts(response.data)
               setConnection(false);
               setConnected(true);
           }
        })
           .catch((error) => {
               if (error === 'Error: Network Error') {
                   setConnected(false);
                   setConnection(false);
               }
           })

    }, [])

    return (
            <>
                <div className={css.mainBG}>

                    <div className={css.menuBG}>

                        <div className={css.btn}>
                            Игровые сервера
                        </div>

                        <div className={css.btn}>
                            Сайт
                        </div>

                        <div className={css.btn}>
                            Сообщество
                        </div>

                        <div style={{width: '190px'}}>

                        </div>

                        <div>
                            <img src={settings} width={25} height={25} style={{marginTop: '3.5px', cursor: 'pointer', webkitAppRegion: 'none'}} alt=""/>
                        </div>

                        <div style={{width: '40px'}}>

                        </div>

                        <div style={{cursor: 'pointer', webkitAppRegion: 'none'}} onClick={() => {
                            window.windowControl.minimize(); }}>
                            <img src={minimize} width={12} height={2} style={{marginTop: '3.5px'}} alt="" />
                        </div>

                        <div>
                            <img src={close} width={15} height={15} style={{marginTop: '3.5px', cursor: 'pointer', webkitAppRegion: 'none', marginLeft: '10px'}} alt="" onClick={() => {
                                window.close()
                            }}/>
                        </div>

                    </div>

                    <div className={css.content} style={connection ? {height: '385px'}: {}}>

                        {connection ?
                        <div style={{width: '704px', height: '100px'}}>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: '150px'}}>
                                <img src={loadingGif} alt=""/>
                            </div>
                        </div>
                        :
                            <>
                                {connected ? <div>
                                    <div>
                                        <div className={css.infoWrapper}>

                                            <div>
                                                <img src={logo} alt="" style={{marginLeft: '50px'}}/>
                                            </div>

                                            <div className={css.serverName} style={{marginLeft: '20px'}}>
                                                {serverName}
                                            </div>

                                        </div>

                                        <div className={css.newsWrapper}>
                                            <div style={{marginLeft: '20px'}}>
                                                Новости
                                            </div>
                                        </div>

                                        <div className={css.postWrapper}>
                                            {
                                                posts.map((item, key) => {
                                                    if (key <= 2) {
                                                        return (
                                                            <div className={css.post} key={key}>
                                                                <img src={item.img} style={{borderRadius: '10px'}} alt=""/>
                                                                <div className={css.postName}>
                                                                    {item.name}
                                                                </div>
                                                            </div>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })
                                            }
                                        </div>

                                        <div className={serverName === 'Выберите сервер' ? css.btnDisabled : css.btnPlay} onClick={() => {
                                            window.game.launch(serverIP, serverPORT)
                                        }}>
                                            <div>
                                                Играть
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                    <div style={{width: '704px', height: '400px', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                                        <div style={{fontSize: '48px', color: '#DC5D5D', marginTop: '100px'}}>
                                            Сервера недоступны.
                                            <div style={{marginTop: '20px'}}>
                                                <img src={loadingGif} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        }

                    </div>

                    <div className={css.statusBar}>

                        <div>
                            {connection ? 'Дождитесь загрузки...' : <>
                                {connected ? <>
                                    {serverName === 'Выберите сервер' ? 'Выберите сервер': 'Нажмите "Играть"'}
                                </> : 'Соединение не установлено.' }
                            </>}
                        </div>

                    </div>
                </div>
        </>
    )
}

export default Main;