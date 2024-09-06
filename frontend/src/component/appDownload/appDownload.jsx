import appDown1 from '../../assets/app1.png'
import appDown2 from '../../assets/app2.png'
import './appDownload.css'
const AppDownload = () =>{
    return(
        <div className="app-download">
            <p>For Better Experience Download <br/> Food App</p>
            <div className="app-downloads-platforms">
                <img src={appDown1} alt="" />
                <img src={appDown2} alt="" />

            </div>
        </div>
    )
}
export default AppDownload