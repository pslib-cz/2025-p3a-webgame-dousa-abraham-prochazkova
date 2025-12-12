import bg from '../assets/sc3-kancelar-starosty.png'
import postava from '../assets/character.png'
import './Intro.css'
import './Sc3-kancelar-starosty.css'

const Sc3KancelarStarosty = () => {
    return (
        <div className="scena">
            <img src={bg} alt="Kancelář" className="bg" />
            <img src={postava} alt="Postava" className="postava-sc3" />
        </div>
    )
}

export default Sc3KancelarStarosty