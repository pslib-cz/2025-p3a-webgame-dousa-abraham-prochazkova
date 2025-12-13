import bg from '../img/sc4-sklep-trezor.png'
import postava from '../img/character.png'
import '../styles/Intro.css'
import '../styles/Sc4-sklep-trezor.css'

const Sc4SklepTrezor = () => {
    return (
        <div className="scena">
            <img src={bg} alt="Trezor" className="bg" />
            <img src={postava} alt="Postava" className="postava-sc4" />
        </div>
    )
}

export default Sc4SklepTrezor