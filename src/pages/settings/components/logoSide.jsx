import logo from "./../../../assets/icons/app/logo.png";

export default function LogoSide() {
    return (
        <div className="flex items-center">
            <img src={logo} width={50} id="logo-in-settings" />
            <p className=" text-2xl">Docsally<sub className="m-1" style={{fontSize:"12px"}}>0.2.0V</sub></p>
        </div>
    )
}