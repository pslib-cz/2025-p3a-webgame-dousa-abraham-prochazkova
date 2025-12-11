import bg from '../assets/sc1-namesti.png'
import postava from '../assets/postava.png'
import './Intro.css'
import './Sc1-namesti.css'
import Inventar from './Inventar'

const Sc1Namesti = () => {
    return (
        <div className="scena">
             <img src={bg} alt="Náměstí" className="bg"/>
             <img src={postava} alt="Postava" className="postava-sc1"/>
             <div className="inventar"><Inventar/></div>
        </div>
    )
}

export default Sc1Namesti