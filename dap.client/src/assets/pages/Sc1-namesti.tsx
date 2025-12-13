import bg from '../img/sc1-namesti.png'
import postava from '../img/character.png'
import '../styles/Intro.css'
import '../styles/Sc1-namesti.css'
import Inventar from '../components/Inventar'

const Sc1Namesti = () => {
    return (
        <div className="scena">
            <img src={bg} alt="Náměstí" className="bg" />
            <img src={postava} alt="Postava" className="postava-sc1" />
            <div className="inventar"><Inventar /></div>
        </div>
    )
}

export default Sc1Namesti