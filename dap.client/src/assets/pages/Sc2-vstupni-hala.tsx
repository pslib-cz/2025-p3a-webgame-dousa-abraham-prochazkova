import bg from '../img/sc2-vstupni-hala.png'
import postava from '../img/character.png'
import '../styles/Intro.css'
import '../styles/Sc2-vstupni-hala.css'

const Sc2VstupniHala = () => {
    return (
        <div className="scena">
            <img src={bg} alt="Vstupní hala" className="bg" />
            <img src={postava} alt="Postava" className="postava-sc2" />
        </div>
    )
}

export default Sc2VstupniHala